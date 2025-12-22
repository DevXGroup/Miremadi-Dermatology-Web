import React from 'react';
import { LegalLayout } from '../../components/layout/LegalLayout';
import { Link } from 'react-router-dom';

export const TermsConditions = () => {
    return (
        <LegalLayout title="Terms & Conditions">
            <h3>Last Updated: December 22, 2025</h3>

            <p>
                Welcome to Miremadi Dermatology. By accessing our website and purchasing products, you agree to be bound by these Terms & Conditions.
                Please read them carefully.
            </p>

            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 p-6 rounded-xl my-8">
                <h4 className="text-red-700 dark:text-red-400 mt-0">IMPORTANT: FINAL SALE POLICY</h4>
                <p className="text-red-700/80 dark:text-red-400/80 mb-0 font-medium">
                    Due to the hygienic nature and perishable quality of our cosmetic and skincare products, <strong>ALL ONLINE SALES ARE FINAL</strong>.
                    Once a product has been opened or used, it is non-usable for any other patient and cannot be returned or exchanged.
                </p>
            </div>

            <h4>1. Use of Services</h4>
            <p>
                You agree to use our website and services only for lawful purposes. You must not misuse our site or attempt to interfere with its proper working.
            </p>

            <h4>2. Product Availability & Pricing</h4>
            <p>
                All products are subject to availability. We reserve the right to discontinue any product at any time. Prices are subject to change without notice.
                We are not responsible for typographical errors regarding price or any other matter.
            </p>

            <h4>3. Return & Refund Policy</h4>
            <p>
                <strong>Strict No-Return Policy on Open Products:</strong> To ensure the safety and health of our customers, we cannot accept returns
                on any cosmetic or skincare products that have been opened, unsealed, or used. These items are considered contaminated and must be disposed of.
            </p>
            <p>
                <strong>Damaged or Defective Items:</strong> If you receive a product that is damaged during shipping or is defective, please contact us within 48 hours of delivery.
                We may require photo evidence to process a potential replacement.
            </p>
            <p>
                <strong>Special Cases:</strong> We understand that exceptional circumstances may arise. If you believe your situation warrants further discussion,
                please DO NOT mail the product back. Instead, <a href="tel:+15551234567" className="text-secondary-DEFAULT font-medium">call our office at (555) 123-4567</a> to discuss your case
                with our staff. We handle these requests on a case-by-case basis and reserve the right to deny any return request that does not meet our strict safety standards.
            </p>

            <h4>4. Medical Disclaimer</h4>
            <p>
                The products and information provided on this website are for cosmetic purposes only and constitute professional dermatological advice ONLY when presribed in a clinical setting.
                Purchasing products online does not establish a doctor-patient relationship. Always consult with a physician for any specific medical concerns.
            </p>

            <h4>5. Limitation of Liability</h4>
            <p>
                Miremadi Dermatology shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our products or services.
            </p>

            <h4>6. Governing Law</h4>
            <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
            </p>

            <h4>7. Changes to Terms</h4>
            <p>
                We reserve the right to modify these terms at any time. Your continued use of the site after any changes indicates your acceptance of the new Terms.
            </p>

            <p className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                <strong>Questions?</strong><br />
                Please contact our office.<br />
                <Link to="/contact" className="text-secondary-DEFAULT hover:underline">Visit Contact Page</Link>
            </p>
        </LegalLayout>
    );
};
