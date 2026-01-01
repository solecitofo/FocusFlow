import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { EventoAgendaTipo, NivelAnsiedad, NivelPrioridad, FrecuenciaRepeticion } from '../types';
import CalendarIcon from '../assets/iconos/Calendar.png';
import XIcon from '../assets/iconos/X.png';

interface AgendaCaptureProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AgendaCapture({ isOpen, onClose }: AgendaCaptureProps) {
  const { addEvento, state } = useApp();
  const { modoCalma } = state.settings;
  const inputRef = useRef<HTMLInputElement>(null);

  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState<EventoAgendaTipo>('evento');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [nivelAnsiedad, setNivelAnsiedad] = useState<NivelAnsiedad>('medio');
  const [nivelPrioridad, setNivelPrioridad] = useState<NivelPrioridad>('normal');
  const [tieneRecordatorio, setTieneRecordatorio] = useState(false);
  const [tipoRecordatorio, setTipoRecordatorio] = useState<'notificacion' | 'email' | 'popup'>('notificacion');
  const [frecuenciaRecordatorio, setFrecuenciaRecordatorio] = useState<'una_vez' | 'diario' | 'semanal' | 'personalizado'>('una_vez');
  const [diasRepeticion, setDiasRepeticion] = useState<number[]>([]);
  const [frecuenciaRepeticion, setFrecuenciaRepeticion] = useState<FrecuenciaRepeticion>('no_repite');
  const [recordatoriosPersonalizados, setRecordatoriosPersonalizados] = useState<Array<{ horas: number; minutos: number }>>([]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const toggleDiaRepeticion = (idx: number) => {
    setDiasRepeticion((prev) =>
      prev.includes(idx) ? prev.filter((d) => d !== idx) : [...prev, idx]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !fecha || !hora) return;

    // Determinar si hay recordatorios personalizados
    const tieneRecordatorios = recordatoriosPersonalizados.length > 0;

    addEvento({
      titulo: titulo.trim(),
      tipo,
      descripcion: descripcion.trim() || undefined,
      fecha,
      hora,
      nivelAnsiedad,
      nivelPrioridad,
      tieneRecordatorio: tieneRecordatorios,
      tipoRecordatorio: tieneRecordatorios ? {
        tipo: tipoRecordatorio,
        frecuencia: frecuenciaRecordatorio,
        dias: diasRepeticion.length > 0 ? diasRepeticion : undefined,
      } : undefined,
      frecuenciaRepeticion,
      diasRepeticion: frecuenciaRepeticion !== 'no_repite' && diasRepeticion.length > 0 ? diasRepeticion : undefined,
      recordatoriosPersonalizados: tieneRecordatorios ? recordatoriosPersonalizados : undefined,
      completado: false,
    });

    // Reset form
    setTitulo('');
    setTipo('evento');
    setDescripcion('');
    setFecha('');
    setHora('');
    setNivelAnsiedad('medio');
    setNivelPrioridad('normal');
    setTieneRecordatorio(false);
    setTipoRecordatorio('notificacion');
    setFrecuenciaRecordatorio('una_vez');
    setDiasRepeticion([]);
    setFrecuenciaRepeticion('no_repite');
    setRecordatoriosPersonalizados([]);

    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
    if (e.key === 'Enter' && e.metaKey) {
      handleSubmit(e as any);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-2xl rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 max-h-[90vh] overflow-y-auto ${
          modoCalma ? 'bg-slate-50' : 'bg-white'
        }`}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <img src={CalendarIcon} alt="Captura Rápida Agenda" width={20} height={20} className="text-blue-500" />
            <h2 className="text-lg font-semibold text-slate-800">
              Captura Rápida Agenda
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <img src={XIcon} alt="Cerrar" width={20} height={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Input principal - Título */}
          <div>
            <label htmlFor="titulo" className="block text-xs font-medium text-slate-600 mb-1">
              Título del evento
            </label>
            <input
              ref={inputRef}
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Reunión, Cumpleaños, Entrega de proyecto..."
              className={`w-full px-4 py-3 text-base rounded-xl border-2 transition-all
                focus:outline-none focus:ring-0
                ${
                  modoCalma
                    ? 'border-slate-200 focus:border-slate-400 bg-white'
                    : 'border-slate-200 focus:border-blue-400 bg-white'
                }
              `}
              autoComplete="off"
            />
          </div>

          {/* Tipo de evento */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2">
              Tipo de evento
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['evento', 'recordatorio', 'cumpleanos', 'obligacion'] as EventoAgendaTipo[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTipo(t)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border-2 transition-all
                    ${
                      tipo === t
                        ? t === 'evento'
                          ? 'border-blue-400 bg-blue-50 text-blue-700'
                          : t === 'recordatorio'
                          ? 'border-green-400 bg-green-50 text-green-700'
                          : t === 'cumpleanos'
                          ? 'border-pink-400 bg-pink-50 text-pink-700'
                          : 'border-orange-400 bg-orange-50 text-orange-700'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }
                  `}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="fecha" className="block text-xs font-medium text-slate-600 mb-1">
                Fecha *
              </label>
              <input
                id="fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-blue-400 bg-white text-sm"
              />
            </div>
            <div>
              <label htmlFor="hora" className="block text-xs font-medium text-slate-600 mb-1">
                Hora *
              </label>
              <input
                id="hora"
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-blue-400 bg-white text-sm"
              />
            </div>
          </div>

          {/* Nivel de Ansiedad y Prioridad */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="ansiedad" className="block text-xs font-medium text-slate-600 mb-1">
                Nivel de Ansiedad
              </label>
              <select
                id="ansiedad"
                value={nivelAnsiedad}
                onChange={(e) => setNivelAnsiedad(e.target.value as NivelAnsiedad)}
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-blue-400 bg-white text-sm"
              >
                <option value="bajo">Bajo 😊</option>
                <option value="medio">Medio 😐</option>
                <option value="alto">Alto 😰</option>
              </select>
            </div>
            <div>
              <label htmlFor="prioridad" className="block text-xs font-medium text-slate-600 mb-1">
                Nivel de Prioridad
              </label>
              <select
                id="prioridad"
                value={nivelPrioridad}
                onChange={(e) => setNivelPrioridad(e.target.value as NivelPrioridad)}
                className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-blue-400 bg-white text-sm"
              >
                <option value="baja">Baja 📋</option>
                <option value="normal">Normal ⭐</option>
                <option value="alta">Alta 🔴</option>
                <option value="urgente">Urgente 🚨</option>
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="descripcion" className="block text-xs font-medium text-slate-600 mb-1">
              Descripción
            </label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Agrega detalles o notas sobre el evento (opcional)"
              className="w-full px-4 py-2 rounded-xl border-2 border-slate-200 focus:border-blue-400 bg-white text-sm min-h-16 resize-none"
            />
          </div>

          {/* Recordatorio */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-2">
              ¿Deseas recordatorios?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="recordatorio"
                  checked={recordatoriosPersonalizados.length === 0}
                  onChange={() => setRecordatoriosPersonalizados([])}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-600">No</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="recordatorio"
                  checked={recordatoriosPersonalizados.length > 0}
                  onChange={() => setRecordatoriosPersonalizados([{ horas: 24, minutos: 0 }])}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-600">Sí</span>
              </label>
            </div>
          </div>

          {/* Configuración de Recordatorios */}
          {recordatoriosPersonalizados.length > 0 && (
            <div className="space-y-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <div>
                <label htmlFor="tipoRecordatorio" className="block text-xs font-medium text-slate-600 mb-1">
                  ¿Cómo quieres recibir los recordatorios?
                </label>
                <select
                  id="tipoRecordatorio"
                  value={tipoRecordatorio}
                  onChange={(e) => setTipoRecordatorio(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-blue-400 bg-white text-sm"
                >
                  <option value="notificacion">🔔 Notificación</option>
                  <option value="email">📧 Email</option>
                  <option value="popup">💬 Pop-up</option>
                </select>
              </div>

              <div>
                <label htmlFor="frecuenciaRecordatorio" className="block text-xs font-medium text-slate-600 mb-1">
                  Frecuencia de recordatorios
                </label>
                <select
                  id="frecuenciaRecordatorio"
                  value={frecuenciaRecordatorio}
                  onChange={(e) => setFrecuenciaRecordatorio(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-blue-400 bg-white text-sm"
                >
                  <option value="una_vez">Una vez</option>
                  <option value="diario">Diario</option>
                  <option value="semanal">Semanal</option>
                  <option value="personalizado">Personalizado</option>
                </select>
              </div>

              {(frecuenciaRecordatorio === 'semanal' || frecuenciaRecordatorio === 'personalizado') && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">¿Qué días?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((dia, idx) => (
                      <label key={dia} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={diasRepeticion.includes(idx)}
                          onChange={() => toggleDiaRepeticion(idx)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-slate-600">{dia}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Recordatorios personalizados */}
              <div className="mt-3 pt-3 border-t border-blue-200">
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  ⏰ Tiempos de recordatorios personalizados
                </label>
                
                {recordatoriosPersonalizados.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {recordatoriosPersonalizados.map((rec, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white p-2 rounded border border-blue-100">
                        <span className="text-sm font-medium text-slate-700">
                          {rec.horas}h {rec.minutos > 0 ? `${rec.minutos}min` : ''} antes
                        </span>
                        <button
                          type="button"
                          onClick={() => setRecordatoriosPersonalizados(
                            recordatoriosPersonalizados.filter((_, i) => i !== idx)
                          )}
                          className="px-2 py-1 text-xs bg-red-100 text-red-600 hover:bg-red-200 rounded"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label htmlFor="horas-recordatorio" className="block text-xs text-slate-500 mb-1">
                      Horas
                    </label>
                    <input
                      id="horas-recordatorio"
                      type="number"
                      min="0"
                      max="168"
                      defaultValue="24"
                      className="w-full px-2 py-1 rounded border-2 border-slate-200 focus:border-blue-400 bg-white text-sm"
                      placeholder="0"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="minutos-recordatorio" className="block text-xs text-slate-500 mb-1">
                      Minutos
                    </label>
                    <input
                      id="minutos-recordatorio"
                      type="number"
                      min="0"
                      max="59"
                      defaultValue="0"
                      className="w-full px-2 py-1 rounded border-2 border-slate-200 focus:border-blue-400 bg-white text-sm"
                      placeholder="0"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const horas = parseInt((document.getElementById('horas-recordatorio') as HTMLInputElement)?.value || '0');
                      const minutos = parseInt((document.getElementById('minutos-recordatorio') as HTMLInputElement)?.value || '0');
                      
                      if (horas >= 0 || minutos >= 0) {
                        setRecordatoriosPersonalizados([
                          ...recordatoriosPersonalizados,
                          { horas, minutos }
                        ]);
                        // Reset inputs
                        (document.getElementById('horas-recordatorio') as HTMLInputElement).value = '24';
                        (document.getElementById('minutos-recordatorio') as HTMLInputElement).value = '0';
                      }
                    }}
                    className="px-4 py-1 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition-all"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Frecuencia de Repetición del Evento */}
          <div>
            <label htmlFor="frecuenciaRepeticion" className="block text-xs font-medium text-slate-600 mb-1">
              ¿Se repite el evento?
            </label>
            <select
              id="frecuenciaRepeticion"
              value={frecuenciaRepeticion}
              onChange={(e) => setFrecuenciaRepeticion(e.target.value as FrecuenciaRepeticion)}
              className="w-full px-3 py-2 rounded-xl border-2 border-slate-200 focus:border-blue-400 bg-white text-sm"
            >
              <option value="no_repite">No se repite</option>
              <option value="diario">Diario</option>
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
              <option value="anual">Anual</option>
              <option value="personalizado">Personalizado</option>
            </select>
          </div>

          {/* Selección de días para repetición */}
          {(frecuenciaRepeticion === 'semanal' || frecuenciaRepeticion === 'personalizado') && (
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-2">¿Qué días de la semana?</label>
              <div className="flex flex-wrap gap-2">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((dia, idx) => (
                  <label key={dia} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={diasRepeticion.includes(idx)}
                      onChange={() => toggleDiaRepeticion(idx)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-slate-600">{dia}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-slate-700 font-semibold
                transition-all duration-200 bg-slate-100 hover:bg-slate-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!titulo.trim() || !fecha || !hora}
              className={`flex-1 py-3 rounded-xl text-white font-semibold
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  modoCalma
                    ? 'bg-slate-700 hover:bg-slate-800'
                    : 'bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                }
              `}
            >
              Agendar evento
            </button>
          </div>

          {/* Hint */}
          <p className="text-xs text-center text-slate-400">
            Presiona <kbd className="px-1 py-0.5 bg-slate-100 rounded">Esc</kbd>{' '}
            para cerrar
          </p>
        </form>
      </div>
    </div>
  );
}
