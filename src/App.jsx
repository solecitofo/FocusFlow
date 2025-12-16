import React, { useState, useEffect } from 'react';
import { Clock, Plus, List, Award, ArrowLeft, Edit2, Check, Trash2, Sparkles } from 'lucide-react';
import logoImg from './assets/logos/focusflow-logo.png';
import emptyStateImg from './assets/illustrations/empty-state.png';
import mascotImg from './assets/illustrations/mascot.png';

const TaskManagerTDAH = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [rewardMessage, setRewardMessage] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    saveData();
  }, [tasks, completedTasks]);

  const loadData = async () => {
    try {
      const tasksData = await window.storage?.get('tdah-tasks');
      const completedData = await window.storage?.get('tdah-completed');
      if (tasksData) setTasks(JSON.parse(tasksData.value));
      if (completedData) setCompletedTasks(JSON.parse(completedData.value));
    } catch {
      // No hay datos previos
    }
  };

  const saveData = async () => {
    try {
      await window.storage?.set('tdah-tasks', JSON.stringify(tasks));
      await window.storage?.set('tdah-completed', JSON.stringify(completedTasks));
    } catch {
      // Error al guardar (localStorage no disponible)
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
    setCurrentView('home');
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setSelectedTask(updatedTask);
    setIsEditing(false);
  };

  const completeTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    const completed = {
      ...task,
      completedAt: new Date().toISOString()
    };
    
    setCompletedTasks([completed, ...completedTasks]);
    setTasks(tasks.filter(t => t.id !== taskId));
    
    showRewardAnimation();
    setCurrentView('home');
  };

  const rewards = [
    { emoji: '🎉', text: '¡Increíble! Has completado una tarea' },
    { emoji: '⭐', text: '¡Excelente trabajo! Mereces una recompensa' },
    { emoji: '🏆', text: '¡Eres imparable! Sigue así' },
    { emoji: '💪', text: '¡Qué bien! Tu esfuerzo vale mucho' },
    { emoji: '🎯', text: '¡Diana! Has logrado tu objetivo' },
    { emoji: '✨', text: '¡Brillante! Cada paso cuenta' },
  ];

  const showRewardAnimation = () => {
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    setRewardMessage(reward);
    setShowReward(true);
    setTimeout(() => setShowReward(false), 4000);
  };

  const HomeView = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="text-center mb-12 space-y-4">
        <img src={logoImg} alt="FocusFlow" className="w-20 h-20 mx-auto mb-4" />
        <h1 className="text-6xl font-light text-gray-800">{formatTime(currentTime)}</h1>
        <p className="text-xl text-gray-600 capitalize">{formatDate(currentTime)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <button
          onClick={() => setCurrentView('quick')}
          className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <Plus className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Captura Rápida</h3>
          <p className="text-gray-600">Guarda tu idea al instante</p>
        </button>

        <button
          onClick={() => setCurrentView('detailed')}
          className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <Edit2 className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Captura Detallada</h3>
          <p className="text-gray-600">Añade más información</p>
        </button>

        <button
          onClick={() => setCurrentView('list')}
          className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <List className="w-12 h-12 text-green-600 mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Mis Tareas</h3>
          <p className="text-gray-600">{tasks.length} tareas activas</p>
        </button>

        <button
          onClick={() => setCurrentView('achievements')}
          className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <Award className="w-12 h-12 text-yellow-600 mb-4 mx-auto" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Mis Logros</h3>
          <p className="text-gray-600">{completedTasks.length} tareas completadas</p>
        </button>
      </div>
    </div>
  );

  const QuickCaptureView = () => {
    const [idea, setIdea] = useState('');

    const handleSave = () => {
      if (idea.trim()) {
        addTask({ title: idea, type: 'quick' });
        setIdea('');
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSave();
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
        <button
          onClick={() => setCurrentView('home')}
          className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg">Volver</span>
        </button>

        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Captura Rápida</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-lg text-gray-700 mb-3">¿Qué idea tienes?</label>
              <input
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu idea o tarea aquí..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors"
                autoFocus
              />
            </div>

            <button
              onClick={handleSave}
              disabled={!idea.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-5 px-8 rounded-2xl text-xl font-semibold hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Guardar Idea
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DetailedCaptureView = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSave = () => {
      if (title.trim()) {
        addTask({ title, description, type: 'detailed' });
        setTitle('');
        setDescription('');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-8">
        <button
          onClick={() => setCurrentView('home')}
          className="mb-8 flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg">Volver</span>
        </button>

        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Captura Detallada</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-lg text-gray-700 mb-3">Título de la tarea</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="¿Qué necesitas hacer?"
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-lg text-gray-700 mb-3">Descripción (opcional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Añade más detalles, pasos o notas..."
                rows="6"
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-5 px-8 rounded-2xl text-xl font-semibold hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Guardar Tarea
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TaskListView = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <button
        onClick={() => setCurrentView('home')}
        className="mb-8 flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-lg">Volver</span>
      </button>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Mis Tareas</h2>

        {tasks.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <img src={emptyStateImg} alt="Sin tareas" className="w-48 h-auto mx-auto mb-6 rounded-2xl" />
            <p className="text-xl text-gray-500">No tienes tareas pendientes</p>
            <p className="text-gray-400 mt-2">¡Empieza a capturar tus ideas!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map(task => (
              <button
                key={task.id}
                onClick={() => {
                  setSelectedTask(task);
                  setCurrentView('detail');
                }}
                className="w-full bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
                {task.description && (
                  <p className="text-gray-600 line-clamp-2">{task.description}</p>
                )}
                <div className="mt-3 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    task.type === 'quick' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {task.type === 'quick' ? 'Rápida' : 'Detallada'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const TaskDetailView = () => {
    const [editedTask, setEditedTask] = useState(selectedTask);

    if (!selectedTask) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-8">
        <button
          onClick={() => {
            setCurrentView('list');
            setIsEditing(false);
          }}
          className="mb-8 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg">Volver a la lista</span>
        </button>

        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
          {isEditing ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Editar Tarea</h2>
              
              <div>
                <label className="block text-lg text-gray-700 mb-3">Título</label>
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-lg text-gray-700 mb-3">Descripción</label>
                <textarea
                  value={editedTask.description || ''}
                  onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                  rows="6"
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => updateTask(editedTask)}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all"
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={() => {
                    setEditedTask(selectedTask);
                    setIsEditing(false);
                  }}
                  className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedTask.title}</h2>
              
              {selectedTask.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Descripción</h3>
                  <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                    {selectedTask.description}
                  </p>
                </div>
              )}

              <div className="mb-8">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedTask.type === 'quick' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {selectedTask.type === 'quick' ? 'Captura Rápida' : 'Captura Detallada'}
                </span>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => completeTask(selectedTask.id)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-5 px-8 rounded-2xl text-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <Check className="w-6 h-6" />
                  Marcar como Completada
                </button>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-5 px-8 rounded-2xl text-xl font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <Edit2 className="w-6 h-6" />
                  Editar Tarea
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const AchievementsView = () => (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-8">
      <button
        onClick={() => setCurrentView('home')}
        className="mb-8 flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-lg">Volver</span>
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <img src={mascotImg} alt="Mascota" className="w-20 h-20 mx-auto mb-4 rounded-full" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Tablero de Éxitos</h2>
          <p className="text-2xl text-gray-600">
            {completedTasks.length} {completedTasks.length === 1 ? 'tarea completada' : 'tareas completadas'}
          </p>
        </div>

        {completedTasks.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <img src={mascotImg} alt="Mascota" className="w-24 h-24 mx-auto mb-4 rounded-full" />
            <p className="text-xl text-gray-500">Aún no has completado ninguna tarea</p>
            <p className="text-gray-400 mt-2">¡Completa tu primera tarea y celebra!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedTasks.map(task => (
              <div
                key={task.id}
                className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
                    {task.description && (
                      <p className="text-gray-600 mb-3">{task.description}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      Completada: {new Date(task.completedAt).toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <Check className="w-8 h-8 text-green-500 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-white text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-4">¡Ideas de Recompensas!</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <p className="font-semibold">🍕 Cena especial o comida favorita</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <p className="font-semibold">☕ Café especial o snack favorito</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <p className="font-semibold">📚 Regalo simbólico (libro, accesorio)</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-4">
                <p className="font-semibold">🎮 Tiempo de descanso y diversión</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const RewardModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-4 animate-bounce-in shadow-2xl">
        <div className="text-8xl mb-6">{rewardMessage.emoji}</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{rewardMessage.text}</h2>
        <p className="text-lg text-gray-600 mb-6">¡Te mereces una recompensa!</p>
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentView('achievements')}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 px-6 rounded-2xl font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all"
          >
            Ver Logros
          </button>
          <button
            onClick={() => setShowReward(false)}
            className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:bg-gray-300 transition-all"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
      
      <div className="min-h-screen">
        {currentView === 'home' && <HomeView />}
        {currentView === 'quick' && <QuickCaptureView />}
        {currentView === 'detailed' && <DetailedCaptureView />}
        {currentView === 'list' && <TaskListView />}
        {currentView === 'detail' && <TaskDetailView />}
        {currentView === 'achievements' && <AchievementsView />}
        {showReward && <RewardModal />}
      </div>
    </>
  );
};

export default TaskManagerTDAH;
