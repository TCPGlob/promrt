import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Info } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Accommodation Inquiry');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep thank you message visible
    }, 500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Prom Coast & South Gippsland</span>
            </div>
            <h3 id="contact-modal-title" className="font-serif text-2xl font-bold text-white">
              Contact Prom Coast
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close contact modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-900">Message Received</h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, {name || 'traveler'}! Our local South Gippsland regional team has received your note and will get back to you shortly.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-950 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer mt-2"
              >
                Close Window
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Quick Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    <span>Regional Visitor Hub</span>
                  </div>
                  <div className="text-stone-600">Prom Coast & South Gippsland, Victoria 3960</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5 mb-1">
                    <Info className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Host & Partner Inquiries</span>
                  </div>
                  <div className="text-stone-600">List your stay or business with Prom Coast</div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Topic</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Accommodation Inquiry">Accommodation & Booking Inquiry</option>
                    <option value="List My Property">Host / Accommodation Partner Listing</option>
                    <option value="Town & Travel Guide">South Gippsland Travel & Itinerary Advice</option>
                    <option value="General Question">General Feedback or Question</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-stone-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you'd like to ask or share about the Prom Coast..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">
                    We typically reply within 24 hours.
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-xs shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
