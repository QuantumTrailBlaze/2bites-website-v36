// --- START OF FILE src/components/LeadMagnetForm.tsx ---

import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import { nanoid } from 'nanoid';
import { supabase } from '@/lib/supabaseClient';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface LeadMagnetFormProps {
  onFormSubmit?: () => void;
}

// Validation constants remain the same
const CONTAINS_INJECTION_CHARS = /[<>;]|--/;
const IS_VALID_NOMBRE_CIUDAD = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s']{3,}$/;
const IS_VALID_CIUDAD_SIMPLE = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s']{1,}$/;
const IS_VALID_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IS_VALID_ESTABLECIMIENTO = /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\s.,'&()/-]{3,}$/;

type PolicySection = {
  title: string;
  content?: string;
  lines?: string[];
  listItems?: string[];
};

const LeadMagnetForm: React.FC<LeadMagnetFormProps> = ({ onFormSubmit }) => {
  const { t, i18n } = useTranslation();
  
  const [formData, setFormData] = useState({
    nombre: '', email: '', establecimiento: '', ciudad: '',
  });
  const [aceptaPolitica, setAceptaPolitica] = useState(false);
  const [showPolicyError, setShowPolicyError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [k: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(p => ({ ...p, [name]: false }));
    setFormErrorMessage(null);
  };

  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    setAceptaPolitica(checked === true);
    if (checked === true) setShowPolicyError(false);
  };

  const validateForm = () => {
    const errors: { [k: string]: boolean } = {};
    let valid = true;
    const trim = (v: string) => v.trim();

    if (!trim(formData.nombre) || !IS_VALID_NOMBRE_CIUDAD.test(trim(formData.nombre)) || CONTAINS_INJECTION_CHARS.test(formData.nombre)) { errors.nombre = true; valid = false; }
    if (!trim(formData.email) || !IS_VALID_EMAIL.test(trim(formData.email)) || CONTAINS_INJECTION_CHARS.test(formData.email)) { errors.email = true; valid = false; }
    if (!trim(formData.establecimiento) || !IS_VALID_ESTABLECIMIENTO.test(trim(formData.establecimiento)) || CONTAINS_INJECTION_CHARS.test(formData.establecimiento)) { errors.establecimiento = true; valid = false; }
    if (!trim(formData.ciudad) || !IS_VALID_CIUDAD_SIMPLE.test(trim(formData.ciudad)) || CONTAINS_INJECTION_CHARS.test(formData.ciudad)) { errors.ciudad = true; valid = false; }

    setFieldErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrorMessage(null);
    setShowPolicyError(false);

    const contentOk = validateForm();
    if (!contentOk) {
      setFormErrorMessage(t('leadMagnetForm.errors.reviewFields'));
      return;
    }
    if (!aceptaPolitica) {
      setShowPolicyError(true);
      setFormErrorMessage(t('leadMagnetForm.errors.mustAcceptPolicy'));
      return;
    }

    setIsSubmitting(true);
    const trimmed = {
      nombre: formData.nombre.trim(),
      email: formData.email.trim().toLowerCase(),
      establecimiento: formData.establecimiento.trim().toLowerCase(),
      ciudad: formData.ciudad.trim(),
    };

    try {
      const { error: insertError } = await supabase.from('leads').insert([{
        name: trimmed.nombre, 
        email: trimmed.email, 
        business_name: trimmed.establecimiento, 
        city: trimmed.ciudad,
        accepted_privacy_policy: aceptaPolitica, 
        unsubscribe_token: nanoid(24),
        language: i18n.language,
      }]);

      if (insertError) {
        if (insertError.code === '23505') {
          setFormErrorMessage(t('leadMagnetForm.errors.alreadyRequested'));
        } else {
          setFormErrorMessage(`${t('leadMagnetForm.errors.saveErrorPrefix')} ${insertError.message}`);
        }
      } else {
        // 1. Construct the dynamic filename based on the current language
        const languageCode = i18n.language; // e.g., 'es', 'ca'
        const fileName = `Catalogo_Profesional_2bites_${languageCode}.pdf`;

        // 2. Use the dynamic filename to create the signed URL
        const { data: signedUrlData, error: urlError } = await supabase.storage
          .from('catalogos')
          .createSignedUrl(fileName, 300); // 300 seconds = 5 minutes

        if (urlError || !signedUrlData.signedUrl) {
          console.error('Error generating signed URL:', urlError);
          setFormErrorMessage(t('leadMagnetForm.errors.linkGenerationError'));
        } else {
          onFormSubmit?.();
          window.location.href = signedUrlData.signedUrl;
        }
      }
    } catch (err: any) {
      console.error(err);
      setFormErrorMessage(`${t('leadMagnetForm.errors.unexpectedErrorPrefix')} ${err.message || ''}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const policySections = t('leadMagnetForm.policyModal.sections', { returnObjects: true }) as PolicySection[];

  return (
    <>
      <Dialog open={policyOpen} onOpenChange={setPolicyOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('leadMagnetForm.policyModal.title')}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-6 max-h-[60vh] overflow-y-auto px-4 py-2">
            {policySections.map((section) => (
              <section key={section.title}>
                <h3 className="text-lg font-medium text-primary mb-2">{section.title}</h3>
                
                {section.content && (
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <Trans
                      defaults={section.content}
                      components={{
                        1: <a href="mailto:info@2bitesco.com" className="text-primary underline" />
                      }}
                    />
                  </p>
                )}

                {section.lines?.map((line, idx) => (
                  <p key={idx} className="text-sm text-slate-700 dark:text-slate-300">
                    <Trans
                      defaults={line}
                      components={{
                        1: <strong />,
                        2: <a href="mailto:info@2bitesco.com" className="text-primary underline" />
                      }}
                    />
                  </p>
                ))}
                {section.listItems && (
                  <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1 pl-4">
                    {section.listItems.map(item => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setPolicyOpen(false)} className={cn("font-medium text-base px-6 py-2 !rounded-md bg-hero-button text-hero-button-foreground hover:bg-hero-button-hover")}>
              {t('leadMagnetForm.policyModal.closeButton')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <form onSubmit={handleSubmit} className="space-y-5 pt-2">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('leadMagnetForm.header.title')}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t('leadMagnetForm.header.subtitle')}</p>
        </div>

        <div>
          <Label htmlFor="modal_nombre">{t('leadMagnetForm.fields.fullNameLabel')}</Label>
          <Input id="modal_nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder={t('leadMagnetForm.fields.fullNamePlaceholder')} disabled={isSubmitting} className={cn(fieldErrors.nombre && "border-red-500")} />
        </div>

        <div>
          <Label htmlFor="modal_email">{t('leadMagnetForm.fields.emailLabel')}</Label>
          <Input id="modal_email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('leadMagnetForm.fields.emailPlaceholder')} disabled={isSubmitting} className={cn(fieldErrors.email && "border-red-500")} />
        </div>

        <div>
          <Label htmlFor="modal_establecimiento">{t('leadMagnetForm.fields.establishmentLabel')}</Label>
          <Input id="modal_establecimiento" name="establecimiento" value={formData.establecimiento} onChange={handleChange} placeholder={t('leadMagnetForm.fields.establishmentPlaceholder')} disabled={isSubmitting} className={cn(fieldErrors.establecimiento && "border-red-500")} />
        </div>

        <div>
          <Label htmlFor="modal_ciudad">{t('leadMagnetForm.fields.cityLabel')}</Label>
          <Input id="modal_ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} placeholder={t('leadMagnetForm.fields.cityPlaceholder')} disabled={isSubmitting} className={cn(fieldErrors.ciudad && "border-red-500")} />
        </div>

        <div className="flex items-start space-x-2 pt-1">
          <Checkbox id="terms_modal" checked={aceptaPolitica} onCheckedChange={handleCheckboxChange} disabled={isSubmitting} className={cn(showPolicyError && 'border-red-500 focus:ring-red-500')} />
          <div>
            <label htmlFor="terms_modal" className="text-sm font-medium">
              <Trans i18nKey="leadMagnetForm.consent.label">
                Acepto la <button type="button" onClick={() => setPolicyOpen(true)} className="font-medium text-primary underline hover:text-primary/90">política de privacidad</button> y recibir comunicaciones.
              </Trans>
            </label>
            {showPolicyError && <p className="text-xs text-red-600 mt-1">{t('leadMagnetForm.consent.error')}</p>}
          </div>
        </div>

        {formErrorMessage && <p className="text-sm text-red-600 text-center">{formErrorMessage}</p>}

        <Button type="submit" className={cn("w-full font-medium text-base px-6 py-2 !rounded-md bg-hero-button text-hero-button-foreground hover:bg-hero-button-hover")} size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          {isSubmitting ? t('leadMagnetForm.button.submitting') : t('leadMagnetForm.button.idle')}
        </Button>
      </form>
    </>
  );
};

export default LeadMagnetForm;
// --- END OF FILE src/components/LeadMagnetForm.tsx ---
