import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, CheckCircle2, XCircle, Home, AlertTriangle} from 'lucide-react';
import { Button } from '@/components/ui/button';

const UnsubscribePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('loading');

  useEffect(() => {
    const processUnsubscribe = async () => {
      setStatus('loading');
      const email = searchParams.get('email');
      const token = searchParams.get('token'); // corregido

      console.log('Unsubscribe attempt with:', { email, token });

      if (!email || !token) {
        setMessage('Faltan parámetros en el enlace.');
        setStatus('error');
        console.error('Missing parameters in unsubscribe link:', { email, token });
        return;
      }

      try {
        // Llamada a la función RPC
        const { data, error: rpcError } = await supabase
          .rpc('unsubscribe_by_token', { p_email: email, p_token: token });

        console.log('RPC call raw response:', { data, rpcError });

        if (rpcError) {
          console.error('Error calling unsubscribe_by_token RPC:', rpcError);
          setMessage('Ocurrió un error al procesar tu solicitud. Por favor, contacta con soporte.');
          setStatus('error');
          return;
        }

        // Supabase-js nos devuelve data como array [ 'success' ] o similar
        const result = Array.isArray(data) ? data[0] : data;

        switch (result) {
          case 'success':
            setMessage('Has sido dado de baja correctamente de todas nuestras comunicaciones.');
            setStatus('success');
            break;
          case 'invalid_or_already_unsubscribed':
            setMessage('Enlace inválido o ya has sido dado de baja anteriormente.');
            setStatus('error');
            break;
          case 'unexpected_error':
            setMessage('Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.');
            setStatus('error');
            break;
          default:
            setMessage('Respuesta desconocida del servidor. Por favor, contacta con soporte.');
            setStatus('error');
        }
      } catch (err) {
        console.error('Unexpected error during unsubscribe process:', err);
        setMessage('Ocurrió un error crítico. Por favor, inténtalo de nuevo más tarde.');
        setStatus('error');
      }
    };

    processUnsubscribe();
  }, [searchParams]);

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">
            Procesando tu solicitud...
          </p>
          <p className="text-slate-500 dark:text-slate-400">Por favor, espera un momento.</p>
        </div>
      );
    }

    if (status === 'success') {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">¡Listo!</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">{message}</p>
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Volver a la página principal
            </Link>
          </Button>
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <AlertTriangle className="h-16 w-16 text-orange-400 mb-4" />
			    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
			      Ups, algo no salió bien
			    </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">{message}</p>
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Volver a la página principal
            </Link>
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto mb-8">
        <Link to="/" aria-label="Página principal de 2bites">
          <img
            src="https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/logos/2bitesco_logo.webp"
            alt="2bites Logo"
            className="h-18 md:h-24 w-auto mx-auto"
          />
        </Link>
      </div>
      <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-8 md:p-12 w-full max-w-md">
        {renderContent()}
      </div>
      <footer className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        &copy; {new Date().getFullYear()} 2bitesco. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default UnsubscribePage;
