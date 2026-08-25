import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, User, Scissors, Check, CheckCircle2, Phone, CreditCard, Download, ArrowRight, ArrowLeft } from 'lucide-react';
import { translations, servicesData, masterBarbers, branchesData } from '../data/barberData';
import confetti from 'canvas-confetti';

export default function BookingModal({ lang, initialService, initialBarber, onClose }) {
  const t = translations[lang].booking;

  const [step, setStep] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState(branchesData[0]);
  const [selectedServices, setSelectedServices] = useState(
    initialService ? [initialService] : [servicesData[0]]
  );
  const [selectedBarber, setSelectedBarber] = useState(
    initialBarber || masterBarbers[0]
  );
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    notes: '',
    paymentMethod: 'telebirr'
  });
  const [bookingRef, setBookingRef] = useState('');

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:30 PM', 
    '03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM', '09:00 PM'
  ];

  const toggleService = (service) => {
    const exists = selectedServices.some(s => s.id === service.id);
    if (exists) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s.id !== service.id));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const totalPriceETB = selectedServices.reduce((sum, s) => sum + s.priceETB, 0);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refCode = `SHG-${randomNum}`;
    setBookingRef(refCode);
    setStep(6);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="modal-backdrop z-50 p-4 sm:p-6">
      <div className="glass-panel-gold rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-fadeIn border border-amber-500/50 shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#12161f]/95 backdrop-blur-md p-6 border-b border-slate-800 flex items-center justify-between z-10">
          <div>
            <h3 className={`text-xl font-bold text-white ${lang === 'am' ? 'font-amharic' : 'font-serif'}`}>
              {t.title}
            </h3>
            <div className="text-xs text-amber-400 font-semibold mt-0.5">
              Step {step} of 6
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* STEP 1: Select Branch */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">{t.step1}</h4>
              <div className="grid grid-cols-1 gap-3">
                {branchesData.map(b => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBranch(b)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedBranch.id === b.id 
                        ? 'border-amber-400 bg-amber-500/10 text-white' 
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${selectedBranch.id === b.id ? 'bg-amber-400 text-black' : 'bg-slate-800 text-slate-300'}`}>
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-base">{lang === 'am' ? b.nameAm : b.nameEn}</div>
                        <div className="text-xs text-slate-400">{lang === 'am' ? b.addressAm : b.addressEn}</div>
                      </div>
                    </div>
                    {selectedBranch.id === b.id && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Services */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">{t.step2}</h4>
                <div className="text-xs text-amber-300 font-bold">
                  Selected ({selectedServices.length})
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto pr-1">
                {servicesData.map(s => {
                  const isChecked = selectedServices.some(item => item.id === s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => toggleService(s)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked 
                          ? 'border-amber-400 bg-amber-500/10 text-white' 
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isChecked ? 'bg-amber-400 text-black' : 'bg-slate-800 text-slate-400'}`}>
                          <Scissors className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{lang === 'am' ? s.nameAm : s.nameEn}</div>
                          <div className="text-xs text-slate-400">{s.duration} min • ETB {s.priceETB}</div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isChecked ? 'border-amber-400 bg-amber-400 text-black' : 'border-slate-700'}`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Price Calculator */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">{t.totalPrice}</span>
                <span className="text-xl font-extrabold gold-gradient-text font-serif">
                  {totalPriceETB} ETB
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Barber Preference */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">{t.step3}</h4>
              <div className="grid grid-cols-1 gap-3">
                {masterBarbers.map(barber => (
                  <div
                    key={barber.id}
                    onClick={() => setSelectedBarber(barber)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedBarber.id === barber.id 
                        ? 'border-amber-400 bg-amber-500/10 text-white' 
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={barber.image} alt={barber.name} className="w-12 h-12 rounded-full object-cover border border-amber-400/40" />
                      <div>
                        <div className="font-bold text-white text-sm">{barber.name}</div>
                        <div className="text-xs text-slate-400">{lang === 'am' ? barber.titleAm : barber.titleEn}</div>
                      </div>
                    </div>
                    {selectedBarber.id === barber.id && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Date & Time */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">{t.step4}</h4>

              {/* Date selection */}
              <div className="grid grid-cols-3 gap-2">
                {['Today', 'Tomorrow', 'Day After'].map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`py-2.5 rounded-xl text-xs font-semibold border cursor-pointer ${
                      selectedDate === d
                        ? 'bg-amber-400 text-black border-amber-400 font-bold'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* Time Slot Picker */}
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 rounded-xl text-xs font-medium border cursor-pointer flex items-center justify-center gap-1.5 ${
                      selectedTime === time
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400 font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{time}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Customer Details */}
          {step === 5 && (
            <form id="booking-form" onSubmit={handleFinalSubmit} className="space-y-4">
              <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">{t.step5}</h4>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name / ሙሉ ስም *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Henok Tsegaye"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (Ethiopia) / ስልክ ቁጥር *</label>
                <input 
                  type="tel"
                  required
                  placeholder="+251 911 000 000"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'telebirr', name: 'Telebirr 📱' },
                    { id: 'cbe', name: 'CBE Birr 🏦' },
                    { id: 'cash', name: 'Cash at Shop 💵' }
                  ].map(pm => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setCustomerInfo({...customerInfo, paymentMethod: pm.id})}
                      className={`py-2 rounded-xl text-xs font-medium border cursor-pointer ${
                        customerInfo.paymentMethod === pm.id
                          ? 'bg-amber-400 text-black border-amber-400 font-bold'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {pm.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Special Requests (Optional)</label>
                <textarea 
                  rows="2"
                  placeholder="e.g. Skin fade with razor part..."
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>
            </form>
          )}

          {/* STEP 6: Confirmation Ticket */}
          {step === 6 && (
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-bold text-white font-serif">{t.successTitle}</h3>

              {/* Digital Receipt Ticket */}
              <div className="glass-panel p-6 rounded-2xl border border-amber-500/40 text-left space-y-3 bg-gradient-to-br from-slate-900 to-black">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs text-slate-400">{t.bookingRef}</span>
                  <span className="font-mono text-lg text-amber-300 font-extrabold">{bookingRef}</span>
                </div>

                <div className="text-xs space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Client:</span>
                    <span className="font-semibold text-white">{customerInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phone:</span>
                    <span className="font-semibold text-white">{customerInfo.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Branch:</span>
                    <span className="font-semibold text-amber-300">{lang === 'am' ? selectedBranch.nameAm : selectedBranch.nameEn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Barber:</span>
                    <span className="font-semibold text-white">{selectedBarber.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date & Time:</span>
                    <span className="font-semibold text-white">{selectedDate} @ {selectedTime}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-amber-400">
                    <span>Total Amount:</span>
                    <span>{totalPriceETB} ETB</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-[#12161f]/95 backdrop-blur-md p-6 border-t border-slate-800 flex items-center justify-between">
          {step > 1 && step < 6 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="btn-outline py-2.5 px-4 text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.back}</span>
            </button>
          )}

          {step < 5 && (
            <button 
              onClick={() => setStep(step + 1)}
              className="btn-gold py-2.5 px-6 text-xs ml-auto"
            >
              <span>{t.next}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 5 && (
            <button 
              form="booking-form"
              type="submit"
              className="btn-gold py-3 px-8 text-sm ml-auto shadow-xl"
            >
              <span>{t.confirm}</span>
            </button>
          )}

          {step === 6 && (
            <button 
              onClick={onClose}
              className="btn-gold py-3 px-8 text-sm mx-auto"
            >
              <span>{t.close}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
