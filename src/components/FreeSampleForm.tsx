// --- START OF FILE src/components/FreeSampleForm.tsx ---

import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, X } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { nanoid } from 'nanoid';
import { supabase } from '@/lib/supabaseClient';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface FreeSampleFormProps {
  onFormSubmit?: () => void;
}

const IS_VALID_TEXT = /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\s.,'&()/-]{2,}$/;
const IS_VALID_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IS_VALID_PHONE = /^[+]?[0-9\s-()]{7,}$/;

const FreeSampleForm: React.FC<FreeSampleFormProps> = ({ onFormSubmit }) => {
  // 1. Get the i18n instance which contains the language
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    nombreCompleto: '', email: '', telefono: '',
    nombreEstablecimiento: '', tipoEstablecimiento: '',
    direccionEnvio: '', ubicacion: '',
  });
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [aceptaPolitica, setAceptaPolitica] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{ type: 'success'|'error'; message: string }|null>(null);
  const [fieldErrors, setFieldErrors] = useState<{[key:string]:string|null}>({});
  const [showPolicyError, setShowPolicyError] = useState(false);

  const establishmentTypes = t('freeSampleForm.data.establishmentTypes', { returnObjects: true }) as string[];
  const productOptions = t('freeSampleForm.data.productOptions', { returnObjects: true }) as string[];
  const policySections = t('leadMagnetForm.policyModal.sections', { returnObjects: true }) as any[];

  const resetFieldErrors = () => setFieldErrors({});

  const validateField = (name:string, value:string, validator:RegExp, msg:string, required:boolean = true) =>
    required && !value ? t('freeSampleForm.validation.required') : (!validator.test(value) ? msg : null);

  const validateForm = (): boolean => {
    const errs: {[k:string]:string|null} = {};
    const trim = (v: string) => v.trim();
    errs.nombreCompleto = validateField('nombreCompleto', trim(formData.nombreCompleto), IS_VALID_TEXT, t('freeSampleForm.validation.invalidName'));
    errs.email = validateField('email', trim(formData.email), IS_VALID_EMAIL, t('freeSampleForm.validation.invalidEmail'));
    errs.telefono = formData.telefono && !IS_VALID_PHONE.test(trim(formData.telefono)) ? t('freeSampleForm.validation.invalidPhone') : null;
    errs.nombreEstablecimiento = validateField('nombreEstablecimiento', trim(formData.nombreEstablecimiento), IS_VALID_TEXT, t('freeSampleForm.validation.invalidName'));
    errs.tipoEstablecimiento = formData.tipoEstablecimiento ? null : t('freeSampleForm.validation.selectType');
    errs.direccionEnvio = validateField('direccionEnvio', trim(formData.direccionEnvio), IS_VALID_TEXT, t('freeSampleForm.validation.invalidAddress'));
    errs.ubicacion = validateField('ubicacion', trim(formData.ubicacion), IS_VALID_TEXT, t('freeSampleForm.validation.invalidLocation'));
    setFieldErrors(errs);
    return Object.values(errs).every(e => e === null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(p => ({ ...p, [name]: null }));
    setSubmissionStatus(null);
  };
  const handleSelectChange = (name: string, value: string) => {
    setFormData(p => ({ ...p, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(p => ({ ...p, [name]: null }));
    setSubmissionStatus(null);
  };
  const handleProductChange = (prod: string, checked: boolean | 'indeterminate') => {
    setSelectedProducts(p => checked === true ? [...p, prod] : p.filter(x => x !== prod));
    setSubmissionStatus(null);
  };
  const handlePolicyCheckboxChange = (checked: boolean | 'indeterminate') => {
    setAceptaPolitica(checked === true);
    if (checked === true) setShowPolicyError(false);
    setSubmissionStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus(null); setShowPolicyError(false);
    const ok = validateForm();
    if (!aceptaPolitica) setShowPolicyError(true);
    if (!ok || !aceptaPolitica) {
      setSubmissionStatus({ type: 'error', message: t('freeSampleForm.validation.formError') });
      return;
    }
    setIsSubmitting(true);
    
    // 2. Add the language to the Supabase insert payload
    const payload = {
      full_name: formData.nombreCompleto.trim(), 
      email: formData.email.trim().toLowerCase(),
      phone: formData.telefono.trim() || null, 
      establishment_name: formData.nombreEstablecimiento.trim().toLowerCase(),
      establishment_type: formData.tipoEstablecimiento, 
      shipping_address: formData.direccionEnvio.trim(),
      location: formData.ubicacion.trim(), 
      interested_products: selectedProducts.length ? selectedProducts : null,
      accepted_privacy_policy: aceptaPolitica, 
      unsubscribe_token: nanoid(24),
      language: i18n.language, // <-- This is the new line
    };

    try {
      const { data: existing, error: fetchError } = await supabase.from('sample_requests').select('id').eq('email', payload.email).eq('establishment_name', payload.establishment_name).maybeSingle();
      if (fetchError) throw fetchError;
      if (existing) {
        setSubmissionStatus({ type: 'error', message: t('freeSampleForm.submission.alreadyRequested') });
      } else {
        const { error: insertError } = await supabase.from('sample_requests').insert([payload]);
        if (insertError) {
          if (insertError.message.includes('unique_email_establishment')) {
            setSubmissionStatus({ type: 'error', message: t('freeSampleForm.submission.alreadyRequested') });
          } else throw insertError;
        } else {
          setSubmissionStatus({ type: 'success', message: t('successModal.title') });
          setFormData({ nombreCompleto: '', email: '', telefono: '', nombreEstablecimiento: '', tipoEstablecimiento: '', direccionEnvio: '', ubicacion: '' });
          setSelectedProducts([]); setAceptaPolitica(false); resetFieldErrors();
        }
      }
    } catch (err: any) {
      console.error(err);
      setSubmissionStatus({ type: 'error', message: `${t('freeSampleForm.submission.submitErrorPrefix')} ${err.message || t('freeSampleForm.submission.tryAgain')}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionStatus?.type === 'success') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <FadeIn duration={500} delay={100} className="w-full max-w-md">
          <div className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl text-center space-y-4 sm:p-8">
            <button onClick={() => { setSubmissionStatus(null); onFormSubmit?.(); }} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600" aria-label={t('freeSampleForm.successModal.close')}>
              <X size={24} />
            </button>
            <img src="https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/logos/2bitesco_logo.webp" alt="2bites Logo" className="h-16 sm:h-20 mx-auto mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold">{t('freeSampleForm.successModal.title')}</h1>
            <p className="text-slate-600 sm:text-lg">{t('freeSampleForm.successModal.message')}</p>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <>
      <Dialog open={policyOpen} onOpenChange={setPolicyOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('freeSampleForm.policyModal.title')}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-6 max-h-[60vh] overflow-y-auto px-4 py-2">
            {policySections.map((section) => (
              <section key={section.title}>
                <h3 className="text-lg font-medium text-primary mb-2">{section.title}</h3>
                {section.content && (<p className="text-sm text-slate-700 dark:text-slate-300"><Trans defaults={section.content} components={{ 1: <a href="mailto:info@2bitesco.com" className="text-primary underline" /> }} /></p>)}
                {section.lines?.map((line: string, idx: number) => ( <p key={idx} className="text-sm text-slate-700 dark:text-slate-300"><Trans defaults={line} components={{ 1: <strong />, 2: <a href="mailto:info@2bitesco.com" className="text-primary underline" /> }} /></p>))}
                {section.listItems && (<ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1 pl-4">{section.listItems.map((item: string) => <li key={item}>{item}</li>)}</ul>)}
              </section>
            ))}
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setPolicyOpen(false)} className={cn("w-auto font-medium text-base px-6 py-2 !rounded-md bg-hero-button text-hero-button-foreground hover:bg-hero-button-hover")}>
              {t('freeSampleForm.policyModal.closeButton')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <form onSubmit={handleSubmit} className={cn("space-y-5 h-[100dvh] overflow-y-auto pb-[25%] px-4 pt-4 max-w-sm mx-auto", "sm:h-auto sm:overflow-visible sm:pb-0 sm:pt-2 sm:px-0 sm:max-w-none sm:mx-0")}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif font-semibold text-gray-800 dark:text-gray-100 mb-1">{t('freeSampleForm.header.title')}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{t('freeSampleForm.header.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="sample_nombreCompleto">{t('freeSampleForm.fields.fullNameLabel')}</Label>
            <Input id="sample_nombreCompleto" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} placeholder={t('freeSampleForm.fields.fullNamePlaceholder')} disabled={isSubmitting} className={cn(fieldErrors.nombreCompleto && "border-red-500")} />
            {fieldErrors.nombreCompleto && <p className="text-xs text-red-500">{fieldErrors.nombreCompleto}</p>}
          </div>
          <div>
            <Label htmlFor="sample_telefono">{t('freeSampleForm.fields.phoneLabel')} <span className="text-xs text-gray-500">{t('freeSampleForm.fields.phoneOptional')}</span></Label>
            <Input id="sample_telefono" name="telefono" value={formData.telefono} onChange={handleChange} placeholder={t('freeSampleForm.fields.phonePlaceholder')} disabled={isSubmitting} className={cn(fieldErrors.telefono && "border-red-500")} />
            {fieldErrors.telefono && <p className="text-xs text-red-500">{fieldErrors.telefono}</p>}
          </div>
          <div>
            <Label htmlFor="sample_email">{t('freeSampleForm.fields.emailLabel')}</Label>
            <Input id="sample_email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('freeSampleForm.fields.emailPlaceholder')} disabled={isSubmitting} className={cn(fieldErrors.email && "border-red-500")} />
            {fieldErrors.email && <p className="text-xs text-red-500">{fieldErrors.email}</p>}
          </div>
          <div>
            <Label htmlFor="sample_tipoEstablecimiento">{t('freeSampleForm.fields.establishmentTypeLabel')}</Label>
            <Select name="tipoEstablecimiento" value={formData.tipoEstablecimiento} onValueChange={v => handleSelectChange('tipoEstablecimiento', v)} disabled={isSubmitting}>
              <SelectTrigger id="sample_tipoEstablecimiento" className={cn(fieldErrors.tipoEstablecimiento && "border-red-500")}>
                <SelectValue placeholder={t('freeSampleForm.fields.establishmentTypePlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {establishmentTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
              </SelectContent>
            </Select>
            {fieldErrors.tipoEstablecimiento && <p className="text-xs text-red-500">{fieldErrors.tipoEstablecimiento}</p>}
          </div>
          <div>
            <Label htmlFor="sample_nombreEstablecimiento">{t('freeSampleForm.fields.establishmentNameLabel')}</Label>
            <Input id="sample_nombreEstablecimiento" name="nombreEstablecimiento" value={formData.nombreEstablecimiento} onChange={handleChange} placeholder={t('freeSampleForm.fields.establishmentNamePlaceholder')} disabled={isSubmitting} className={cn(fieldErrors.nombreEstablecimiento && "border-red-500")} />
            {fieldErrors.nombreEstablecimiento && <p className="text-xs text-red-500">{fieldErrors.nombreEstablecimiento}</p>}
          </div>
          <div>
            <Label htmlFor="sample_ubicacion">{t('freeSampleForm.fields.locationLabel')}</Label>
            <Input id="sample_ubicacion" name="ubicacion" value={formData.ubicacion} onChange={handleChange} placeholder={t('freeSampleForm.fields.locationPlaceholder')} disabled={isSubmitting} className={cn(fieldErrors.ubicacion && "border-red-500")} />
            {fieldErrors.ubicacion && <p className="text-xs text-red-500">{fieldErrors.ubicacion}</p>}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="sample_direccionEnvio">{t('freeSampleForm.fields.shippingAddressLabel')}</Label>
            <Input id="sample_direccionEnvio" name="direccionEnvio" value={formData.direccionEnvio} onChange={handleChange} placeholder={t('freeSampleForm.fields.shippingAddressPlaceholder')} disabled={isSubmitting} className={cn(fieldErrors.direccionEnvio && "border-red-500")} />
            {fieldErrors.direccionEnvio && <p className="text-xs text-red-500">{fieldErrors.direccionEnvio}</p>}
          </div>
          <div className="md:col-span-2">
            <Label>{t('freeSampleForm.fields.interestedProductsLabel')} <span className="text-xs text-gray-500">{t('freeSampleForm.fields.interestedProductsOptional')}</span></Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 p-3 border rounded-md">
              {productOptions.map(prod => (
                <div key={prod} className="flex items-center space-x-2">
                  <Checkbox id={`prod_${prod.replace(/\s+/g, '_')}`} checked={selectedProducts.includes(prod)} onCheckedChange={c => handleProductChange(prod, c)} disabled={isSubmitting || (selectedProducts.length >= 3 && !selectedProducts.includes(prod))} />
                  <Label htmlFor={`prod_${prod.replace(/\s+/g, '_')}`} className="text-sm">{prod}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-start space-x-2 pt-3">
          <Checkbox id="terms_sample" checked={aceptaPolitica} onCheckedChange={handlePolicyCheckboxChange} disabled={isSubmitting} className={cn(showPolicyError && 'border-red-500 focus:ring-red-500')} />
          <div>
            <label htmlFor="terms_sample" className="text-sm font-medium">
              <Trans i18nKey="freeSampleForm.consent.label">
                Acepto la <button type="button" onClick={() => setPolicyOpen(true)} className="font-medium text-primary underline hover:text-primary/90">política de privacidad</button> y recibir comunicaciones.
              </Trans>
            </label>
            {showPolicyError && <p className="text-xs text-red-600 mt-1">{t('freeSampleForm.consent.error')}</p>}
          </div>
        </div>
        {submissionStatus?.type === 'error' && <p className="text-sm text-red-600 text-center whitespace-pre-line py-2">{submissionStatus.message}</p>}
        <Button type="submit" className={cn("w-full font-medium text-base px-6 py-2 !rounded-md bg-hero-button text-hero-button-foreground hover:bg-hero-button-hover")} size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          {isSubmitting ? t('freeSampleForm.button.submitting') : t('freeSampleForm.button.idle')}
        </Button>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">{t('freeSampleForm.footerNote')}</p>
      </form>
    </>
  );
};

export default FreeSampleForm;
// --- END OF FILE src/components/FreeSampleForm.tsx ---
