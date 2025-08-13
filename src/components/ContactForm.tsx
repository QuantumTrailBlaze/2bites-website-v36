// --- START OF FILE src/components/ContactForm.tsx ---

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, X } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { supabase } from '@/lib/supabaseClient';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface ContactFormProps {
  formTitle: string;
  requestType: string;
  onFormSubmit?: () => void;
  onCloseModal?: () => void;
}

const IS_VALID_TEXT = /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\s.,'&()/-]{2,}$/;
const IS_VALID_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IS_VALID_PHONE = /^[+]?[0-9\s-()]{7,}$/;

const ContactForm: React.FC<ContactFormProps> = ({ formTitle, requestType, onFormSubmit, onCloseModal }) => {
  // 1. Get the i18n instance which contains the language
  const { t, i18n } = useTranslation();
  
  const [formData, setFormData] = useState({ fullName: '', email: '', company: '', city: '', phone: '', message: '' });
  const [aceptaPolitica, setAceptaPolitica] = useState(false);
  const [showPolicyError, setShowPolicyError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [k: string]: string | null }>({});
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [policyOpen, setPolicyOpen] = useState(false);

  const policySections = t('leadMagnetForm.policyModal.sections', { returnObjects: true }) as any[];

  useEffect(() => {
    setPortalContainer(document.body);
    setSubmissionStatus(null);
    setFieldErrors({});
    setFormData({ fullName: '', email: '', company: '', city: '', phone: '', message: '' });
    setAceptaPolitica(false);
    setShowPolicyError(false);
  }, [formTitle, requestType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((p) => ({ ...p, [name]: null }));
    setSubmissionStatus(null);
  };

  const handlePolicyCheckboxChange = (checked: boolean | 'indeterminate') => {
    setAceptaPolitica(checked === true);
    if (checked === true) setShowPolicyError(false);
    setSubmissionStatus(null);
  };

  const validateField = (value: string, validator: RegExp, errorMessage: string, required: boolean = true) => {
    if (required && !value.trim()) return t('contactForm.validation.required');
    if (value.trim() && !validator.test(value.trim())) return errorMessage;
    return null;
  };

  const validateMessage = (value: string) => {
    if (!value.trim()) return t('contactForm.validation.required');
    if (value.trim().length < 10 || value.trim().split(/\s+/).filter((w) => w.length > 0).length < 3)
      return t('contactForm.validation.messageTooShort');
    return null;
  };

  const validateForm = (): boolean => {
    const errs: { [k: string]: string | null } = {};
    errs.fullName = validateField(formData.fullName, IS_VALID_TEXT, t('contactForm.validation.invalidName'));
    errs.email = validateField(formData.email, IS_VALID_EMAIL, t('contactForm.validation.invalidEmail'));
    errs.company = validateField(formData.company, IS_VALID_TEXT, t('contactForm.validation.invalidCompany'));
    errs.city = validateField(formData.city, IS_VALID_TEXT, t('contactForm.validation.invalidCity'));
    errs.message = validateMessage(formData.message);
    errs.phone = validateField(formData.phone, IS_VALID_PHONE, t('contactForm.validation.invalidPhone'), false);
    setFieldErrors(errs);
    return Object.values(errs).every((e) => e === null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus(null);
    setShowPolicyError(false);

    const ok = validateForm();
    if (!aceptaPolitica) setShowPolicyError(true);
    if (!ok || !aceptaPolitica) {
      setSubmissionStatus({ type: 'error', message: t('contactForm.validation.formError') });
      return;
    }

    setIsSubmitting(true);
    
    // 2. Add the language to the Supabase insert payload
    const payload = {
      full_name: formData.fullName.trim(), 
      email: formData.email.trim().toLowerCase(),
      company: formData.company.trim(), 
      city: formData.city.trim(),
      phone: formData.phone.trim() || null, 
      message: formData.message.trim(),
      request_type: requestType, 
      accepted_privacy_policy: aceptaPolitica,
      language: i18n.language, // <-- This is the new line
    };

    try {
      const { error } = await supabase.from('contact_requests').insert([payload]);
      if (error) throw error;
      setSubmissionStatus({ type: 'success', message: t('contactForm.successModal.message') });
      onFormSubmit?.();
    } catch (err: any) {
      console.error(err);
      setSubmissionStatus({ type: 'error', message: `${t('contactForm.submission.submitErrorPrefix')} ${err.message || t('contactForm.submission.tryAgain')}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setSubmissionStatus(null);
    onCloseModal?.();
  };

  if (submissionStatus?.type === 'success' && portalContainer) {
    return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <FadeIn duration={500} delay={100} className="w-full max-w-md">
          <div className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl text-center space-y-4">
            <button type="button" onClick={handleCloseSuccess} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" aria-label={t('contactForm.successModal.close')}>
              <X size={24} />
            </button>
            <img src="https://msiwuhhptrmgvhrclksp.supabase.co/storage/v1/object/public/website-assets/logos/2bitesco_logo.webp" alt="2bites Logo" className="h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">{t('contactForm.successModal.title')}</h1>
            <p className="text-slate-600">{submissionStatus.message}</p>
          </div>
        </FadeIn>
      </div>,
      portalContainer
    );
  }

  return (
    <>
      <Dialog open={policyOpen} onOpenChange={setPolicyOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('contactForm.policyModal.title')}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-6 max-h-[60vh] overflow-y-auto px-4 py-2">
            {policySections.map((section) => (
              <section key={section.title}>
                <h3 className="text-lg font-medium text-primary mb-2">{section.title}</h3>
                {section.content && <p className="text-sm text-slate-700 dark:text-slate-300"><Trans defaults={section.content} components={{ 1: <a href="mailto:info@2bitesco.com" className="text-primary underline" /> }} /></p>}
                {section.lines?.map((line: string, idx: number) => <p key={idx} className="text-sm text-slate-700 dark:text-slate-300"><Trans defaults={line} components={{ 1: <strong />, 2: <a href="mailto:info@2bitesco.com" className="text-primary underline" /> }} /></p>)}
                {section.listItems && <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1 pl-4">{section.listItems.map((item: string) => <li key={item}>{item}</li>)}</ul>}
              </section>
            ))}
          </DialogDescription>
          <DialogFooter className="flex justify-end">
            <Button onClick={() => setPolicyOpen(false)} className="px-6 py-2 rounded-md bg-hero-button text-white hover:bg-hero-button-hover">
              {t('contactForm.policyModal.closeButton')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <form onSubmit={handleSubmit} className="space-y-5 p-2 max-w-md mx-auto" noValidate>
        <div className="text-center mb-6"><h2 className="text-2xl font-semibold">{formTitle}</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="contact_fullName">{t('contactForm.fields.fullNameLabel')}</Label>
            <Input id="contact_fullName" name="fullName" value={formData.fullName} onChange={handleChange} disabled={isSubmitting} className={cn(fieldErrors.fullName && 'border-red-500')} />
            {fieldErrors.fullName && <p className="text-xs text-red-500">{fieldErrors.fullName}</p>}
          </div>
          <div>
            <Label htmlFor="contact_email">{t('contactForm.fields.emailLabel')}</Label>
            <Input id="contact_email" name="email" type="email" value={formData.email} onChange={handleChange} disabled={isSubmitting} className={cn(fieldErrors.email && 'border-red-500')} />
            {fieldErrors.email && <p className="text-xs text-red-500">{fieldErrors.email}</p>}
          </div>
          <div>
            <Label htmlFor="contact_company">{t('contactForm.fields.companyLabel')}</Label>
            <Input id="contact_company" name="company" value={formData.company} onChange={handleChange} disabled={isSubmitting} className={cn(fieldErrors.company && 'border-red-500')} />
            {fieldErrors.company && <p className="text-xs text-red-500">{fieldErrors.company}</p>}
          </div>
          <div>
            <Label htmlFor="contact_city">{t('contactForm.fields.cityLabel')}</Label>
            <Input id="contact_city" name="city" value={formData.city} onChange={handleChange} disabled={isSubmitting} className={cn(fieldErrors.city && 'border-red-500')} />
            {fieldErrors.city && <p className="text-xs text-red-500">{fieldErrors.city}</p>}
          </div>
          <div>
            <Label htmlFor="contact_phone">{t('contactForm.fields.phoneLabel')}</Label>
            <Input id="contact_phone" name="phone" value={formData.phone} onChange={handleChange} disabled={isSubmitting} className={cn(fieldErrors.phone && 'border-red-500')} />
            {fieldErrors.phone && <p className="text-xs text-red-500">{fieldErrors.phone}</p>}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="contact_message">{t('contactForm.fields.messageLabel')}</Label>
            <Textarea id="contact_message" name="message" value={formData.message} onChange={handleChange} rows={4} disabled={isSubmitting} className={cn(fieldErrors.message && 'border-red-500')} />
            {fieldErrors.message && <p className="text-xs text-red-500">{fieldErrors.message}</p>}
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox id="terms_contact" checked={aceptaPolitica} onCheckedChange={handlePolicyCheckboxChange} disabled={isSubmitting} className={cn(showPolicyError && 'border-red-500')} />
          <div>
            <label htmlFor="terms_contact" className="text-sm">
              <Trans i18nKey="contactForm.consent.label">
                Acepto la <button type="button" onClick={() => setPolicyOpen(true)} className="text-primary underline">política de privacidad</button> y recibir comunicaciones.
              </Trans>
            </label>
            {showPolicyError && <p className="text-xs text-red-600 mt-1">{t('contactForm.consent.error')}</p>}
          </div>
        </div>
        {submissionStatus?.type === 'error' && <p className="text-sm text-red-600">{submissionStatus.message}</p>}
        <div className="mt-4 flex justify-center">
          <Button type="submit" disabled={isSubmitting} className="px-6 py-2 rounded-md bg-hero-button text-white hover:bg-hero-button-hover">
            {isSubmitting && <Loader2 className="animate-spin mr-2" />}
            {isSubmitting ? t('contactForm.button.submitting') : t('contactForm.button.idle')}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
// --- END OF FILE src/components/ContactForm.tsx ---
