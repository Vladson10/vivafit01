"use client"

import { useState, useEffect } from 'react'
import { 
  Heart, 
  Home, 
  ChefHat, 
  Apple, 
  Sparkles, 
  Dumbbell, 
  Smile,
  Star,
  Clock,
  Users,
  ArrowLeft,
  Play,
  BookOpen,
  Calendar,
  Target,
  Zap,
  Leaf,
  CheckCircle2,
  Circle,
  Timer,
  Award,
  TrendingUp,
  Sun,
  Moon,
  Coffee,
  Utensils,
  Activity,
  Pause,
  RotateCcw,
  Check
} from 'lucide-react'

type Section = 'home' | 'recipes' | 'meals' | 'skincare' | 'workouts' | 'wellness' | 'meal-plan' | 'workout-routine' | 'weekly-routine'
type MealPlan = 'weight-loss' | 'toning' | 'energy'

interface Exercise {
  id: string
  name: string
  duration: string
  difficulty: 'Fácil' | 'Medio' | 'Difícil'
  muscles: string
  category: string
  completed?: boolean
}

interface Recipe {
  id: string
  name: string
  calories: string
  time: string
  ingredients: string[]
  instructions: string
  tip: string
  category: string
}

export default function Page() {
  const [currentSection, setCurrentSection] = useState<Section>('home')
  const [currentMealPlan, setCurrentMealPlan] = useState<MealPlan | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [completedExercises, setCompletedExercises] = useState<string[]>([])
  const [isWorkoutActive, setIsWorkoutActive] = useState(false)
  const [workoutTimer, setWorkoutTimer] = useState(900) // 15 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentWorkout, setCurrentWorkout] = useState<Exercise[]>([])
  const [workoutCompleted, setWorkoutCompleted] = useState(false)
  const [weeklyRoutine, setWeeklyRoutine] = useState<{[key: string]: string[]}>({})

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && workoutTimer > 0) {
      interval = setInterval(() => {
        setWorkoutTimer(prev => prev - 1)
      }, 1000)
    } else if (workoutTimer === 0) {
      setIsTimerRunning(false)
      // Auto-complete workout when timer ends
      if (currentWorkout.length > 0) {
        setWorkoutCompleted(true)
      }
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, workoutTimer, currentWorkout.length])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
  }

  const toggleExerciseComplete = (exerciseId: string) => {
    setCompletedExercises(prev => 
      prev.includes(exerciseId)
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    )
  }

  const startWorkout = (exercises: Exercise[]) => {
    setCurrentWorkout(exercises)
    setIsWorkoutActive(true)
    setWorkoutTimer(900) // Reset to 15 minutes
    setIsTimerRunning(true)
    setWorkoutCompleted(false)
    setCompletedExercises([])
    setCurrentSection('workout-routine')
  }

  const completeWorkout = () => {
    setWorkoutCompleted(true)
    setIsTimerRunning(false)
  }

  const resetWorkout = () => {
    setIsWorkoutActive(false)
    setWorkoutTimer(900)
    setIsTimerRunning(false)
    setCurrentWorkout([])
    setWorkoutCompleted(false)
    setCompletedExercises([])
    setCurrentSection('workouts')
  }

  const motivationalMessages = [
    "¡Tu cuerpo puede hacerlo, solo necesitas creer en ti!",
    "Cada día que entrenas, te acercas más a tu mejor versión",
    "Comer saludable es un acto de amor propio",
    "Eres más fuerte de lo que crees",
    "Hoy es un buen día para cuidarte",
    "Tu bienestar es tu prioridad",
    "Cada pequeño paso cuenta hacia tu meta",
    "Eres capaz de lograr todo lo que te propongas"
  ]

  const dailyTips = [
    "💧 Toma al menos 8 vasos de agua hoy para mantener tu piel radiante",
    "🥑 Incluye aguacate en tu desayuno para grasas saludables",
    "🧘‍♀️ Dedica 5 minutos a respirar profundo y relajarte",
    "🏃‍♀️ Camina 10 minutos después de cada comida",
    "😴 Duerme 7-8 horas para una mejor recuperación muscular",
    "🌱 Añade vegetales verdes a tu almuerzo",
    "☀️ Toma 10 minutos de sol para vitamina D natural",
    "🍓 Come frutas de temporada para más antioxidantes"
  ]

  const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)]
  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]

  const allExercises: Exercise[] = [
    // Home Cardio
    { id: 'jumping-jacks', name: 'Jumping Jacks', duration: '30 seg', difficulty: 'Fácil', muscles: 'Cuerpo completo', category: 'Cardio en Casa' },
    { id: 'burpees', name: 'Burpees', duration: '45 seg', difficulty: 'Difícil', muscles: 'Cuerpo completo', category: 'Cardio en Casa' },
    { id: 'mountain-climbers', name: 'Mountain Climbers', duration: '30 seg', difficulty: 'Medio', muscles: 'Core, piernas', category: 'Cardio en Casa' },
    { id: 'high-knees', name: 'Rodillas Altas', duration: '30 seg', difficulty: 'Fácil', muscles: 'Piernas, cardio', category: 'Cardio en Casa' },
    { id: 'butt-kicks', name: 'Patadas al Glúteo', duration: '30 seg', difficulty: 'Fácil', muscles: 'Piernas, glúteos', category: 'Cardio en Casa' },
    
    // Abs & Core
    { id: 'crunches', name: 'Crunches', duration: '45 seg', difficulty: 'Fácil', muscles: 'Abdomen superior', category: 'Abdomen y Core' },
    { id: 'plank', name: 'Plancha', duration: '60 seg', difficulty: 'Medio', muscles: 'Core completo', category: 'Abdomen y Core' },
    { id: 'bicycle-crunches', name: 'Bicicleta', duration: '45 seg', difficulty: 'Medio', muscles: 'Oblicuos', category: 'Abdomen y Core' },
    { id: 'leg-raises', name: 'Elevación de Piernas', duration: '30 seg', difficulty: 'Medio', muscles: 'Abdomen inferior', category: 'Abdomen y Core' },
    { id: 'russian-twists', name: 'Giros Rusos', duration: '45 seg', difficulty: 'Medio', muscles: 'Oblicuos, core', category: 'Abdomen y Core' },
    
    // Glutes & Legs
    { id: 'squats', name: 'Sentadillas', duration: '45 seg', difficulty: 'Fácil', muscles: 'Glúteos, cuádriceps', category: 'Glúteos y Piernas' },
    { id: 'lunges', name: 'Zancadas', duration: '60 seg', difficulty: 'Medio', muscles: 'Glúteos, piernas', category: 'Glúteos y Piernas' },
    { id: 'glute-bridges', name: 'Puente de Glúteos', duration: '45 seg', difficulty: 'Fácil', muscles: 'Glúteos, isquiotibiales', category: 'Glúteos y Piernas' },
    { id: 'wall-sit', name: 'Sentadilla en Pared', duration: '60 seg', difficulty: 'Medio', muscles: 'Cuádriceps, glúteos', category: 'Glúteos y Piernas' },
    { id: 'calf-raises', name: 'Elevación de Pantorrillas', duration: '45 seg', difficulty: 'Fácil', muscles: 'Pantorrillas', category: 'Glúteos y Piernas' },
    
    // Arms & Back
    { id: 'push-ups', name: 'Flexiones', duration: '30 seg', difficulty: 'Medio', muscles: 'Pecho, tríceps', category: 'Brazos y Espalda' },
    { id: 'tricep-dips', name: 'Fondos de Tríceps', duration: '30 seg', difficulty: 'Medio', muscles: 'Tríceps', category: 'Brazos y Espalda' },
    { id: 'arm-circles', name: 'Círculos de Brazos', duration: '30 seg', difficulty: 'Fácil', muscles: 'Hombros, brazos', category: 'Brazos y Espalda' },
    { id: 'superman', name: 'Superman', duration: '45 seg', difficulty: 'Medio', muscles: 'Espalda baja', category: 'Brazos y Espalda' },
    
    // Full Body Express
    { id: 'squat-jumps', name: 'Sentadillas con Salto', duration: '30 seg', difficulty: 'Difícil', muscles: 'Cuerpo completo', category: 'Cuerpo Completo Express' },
    { id: 'push-up-to-t', name: 'Flexión a T', duration: '45 seg', difficulty: 'Difícil', muscles: 'Cuerpo completo', category: 'Cuerpo Completo Express' }
  ]

  const allRecipes: Recipe[] = [
    // Desayunos
    { id: 'arepa-integral', name: 'Arepas Integrales con Aguacate', calories: '180 cal', time: '15 min', ingredients: ['Harina integral', 'Agua', 'Sal', 'Aguacate', 'Tomate'], instructions: 'Mezcla la harina con agua tibia y sal. Forma las arepas y cocina en plancha por 7 min cada lado. Sirve con aguacate y tomate.', tip: 'Rica en fibra, te mantiene saciada por más tiempo', category: 'Desayunos' },
    { id: 'avena-frutas', name: 'Avena con Frutas Tropicales', calories: '220 cal', time: '10 min', ingredients: ['Avena', 'Mango', 'Papaya', 'Coco rallado', 'Miel'], instructions: 'Cocina la avena, añade las frutas picadas y un toque de miel.', tip: 'Perfecta para el desayuno, llena de antioxidantes', category: 'Desayunos' },
    { id: 'panqueques-avena', name: 'Panqueques de Avena y Huevo', calories: '200 cal', time: '12 min', ingredients: ['Avena molida', 'Huevos', 'Plátano', 'Canela', 'Vainilla'], instructions: 'Licua todos los ingredientes. Cocina en sartén antiadherente por 3 min cada lado.', tip: 'Alto en proteína, ideal post-entrenamiento', category: 'Desayunos' },
    { id: 'smoothie-verde', name: 'Smoothie Verde de Piña y Espinaca', calories: '150 cal', time: '5 min', ingredients: ['Espinaca', 'Piña', 'Agua de coco', 'Jengibre', 'Limón'], instructions: 'Licua todos los ingredientes hasta obtener consistencia suave.', tip: 'Desintoxicante natural, rico en vitaminas', category: 'Desayunos' },
    
    // Almuerzos
    { id: 'ensalada-mango', name: 'Ensalada de Mango y Pollo', calories: '280 cal', time: '20 min', ingredients: ['Pechuga de pollo', 'Mango', 'Lechuga', 'Cebolla morada', 'Vinagreta'], instructions: 'Cocina el pollo a la plancha. Mezcla con mango en cubos, lechuga y cebolla. Aliña con vinagreta.', tip: 'Combinación perfecta de proteína y vitaminas', category: 'Almuerzos' },
    { id: 'pollo-quinoa', name: 'Pollo con Quinoa y Verduras', calories: '320 cal', time: '25 min', ingredients: ['Pechuga de pollo', 'Quinoa', 'Brócoli', 'Zanahoria', 'Aceite de oliva'], instructions: 'Cocina la quinoa. Saltea el pollo con las verduras. Sirve todo junto.', tip: 'Proteína completa con carbohidratos complejos', category: 'Almuerzos' },
    { id: 'arroz-atun', name: 'Arroz Integral con Atún', calories: '290 cal', time: '18 min', ingredients: ['Arroz integral', 'Atún en agua', 'Pimientos', 'Cebolla', 'Cilantro'], instructions: 'Cocina el arroz. Saltea los vegetales y mezcla con atún. Sirve sobre el arroz.', tip: 'Rico en omega-3 y fibra', category: 'Almuerzos' },
    
    // Cenas
    { id: 'empanada-fit', name: 'Empanadas al Horno Fit', calories: '150 cal', time: '25 min', ingredients: ['Masa integral', 'Pollo desmenuzado', 'Verduras', 'Especias'], instructions: 'Rellena la masa con pollo y verduras, hornea a 180°C por 20 minutos.', tip: 'Versión saludable del clásico colombiano', category: 'Cenas' },
    { id: 'sopa-verduras', name: 'Sopa de Verduras con Lentejas', calories: '180 cal', time: '30 min', ingredients: ['Lentejas', 'Zanahoria', 'Apio', 'Cebolla', 'Ajo', 'Cilantro'], instructions: 'Cocina las lentejas con las verduras picadas. Sazona con hierbas.', tip: 'Rica en proteína vegetal y fibra', category: 'Cenas' },
    
    // Snacks
    { id: 'bowl-acai', name: 'Bowl de Açaí', calories: '250 cal', time: '8 min', ingredients: ['Açaí congelado', 'Plátano', 'Granola', 'Coco', 'Fresas'], instructions: 'Licua el açaí con plátano. Sirve en bowl y decora con toppings.', tip: 'Antioxidante natural, energía saludable', category: 'Snacks' },
    { id: 'muffins-zanahoria', name: 'Muffins de Zanahoria Fit', calories: '120 cal', time: '35 min', ingredients: ['Harina integral', 'Zanahoria rallada', 'Huevos', 'Aceite de coco', 'Canela'], instructions: 'Mezcla ingredientes secos y húmedos por separado. Une y hornea 20 min a 180°C.', tip: 'Perfecto para llevar, sin azúcar refinada', category: 'Snacks' },
    { id: 'yogurt-tropical', name: 'Yogurt con Frutas Tropicales', calories: '160 cal', time: '5 min', ingredients: ['Yogurt griego', 'Mango', 'Maracuyá', 'Granola', 'Miel'], instructions: 'Sirve el yogurt con frutas picadas y granola encima.', tip: 'Probióticos naturales para la digestión', category: 'Snacks' },
    
    // Bebidas
    { id: 'agua-detox', name: 'Agua Detox de Pepino', calories: '10 cal', time: '5 min', ingredients: ['Agua', 'Pepino', 'Limón', 'Menta', 'Jengibre'], instructions: 'Corta los ingredientes y déjalos reposar en agua por 2 horas.', tip: 'Hidratante y desintoxicante natural', category: 'Bebidas' },
    { id: 'te-verde', name: 'Té Verde con Limón y Miel', calories: '25 cal', time: '8 min', ingredients: ['Té verde', 'Limón', 'Miel', 'Jengibre'], instructions: 'Prepara el té, añade limón y miel al gusto.', tip: 'Acelera el metabolismo naturalmente', category: 'Bebidas' },
    
    // Postres saludables
    { id: 'chia-pudding', name: 'Pudding de Chía con Coco', calories: '180 cal', time: '10 min + reposo', ingredients: ['Semillas de chía', 'Leche de coco', 'Vainilla', 'Mango', 'Coco rallado'], instructions: 'Mezcla chía con leche de coco y vainilla. Refrigera 4 horas. Sirve con mango.', tip: 'Rico en omega-3 y fibra', category: 'Postres' },
    { id: 'helado-platano', name: 'Helado de Plátano y Cacao', calories: '140 cal', time: '5 min', ingredients: ['Plátanos congelados', 'Cacao en polvo', 'Leche de almendras', 'Vainilla'], instructions: 'Licua todos los ingredientes hasta obtener textura cremosa.', tip: 'Postre saludable sin azúcar añadida', category: 'Postres' }
  ]

  const skincareRoutines = [
    {
      id: 'morning',
      name: 'Rutina de Mañana',
      steps: ['Limpieza suave con agua tibia', 'Tónico natural de agua de rosas', 'Suero de vitamina C', 'Hidratante con SPF 30+'],
      time: '8 min',
      benefits: 'Protege y prepara la piel para el día'
    },
    {
      id: 'night',
      name: 'Rutina de Noche',
      steps: ['Desmaquillante natural', 'Limpieza profunda', 'Exfoliación (2x semana)', 'Mascarilla hidratante', 'Crema nutritiva'],
      time: '15 min',
      benefits: 'Repara y regenera durante el descanso'
    },
    {
      id: 'post-workout',
      name: 'Post-Entrenamiento',
      steps: ['Limpieza inmediata con toallitas', 'Tónico refrescante', 'Hidratante ligero', 'Protector solar si es de día'],
      time: '5 min',
      benefits: 'Previene brotes por sudor'
    }
  ]

  const naturalMasks = [
    {
      id: 'avocado-honey',
      name: 'Mascarilla de Aguacate y Miel',
      ingredients: ['1 aguacate maduro', '2 cucharadas de miel', 'Unas gotas de aceite de oliva'],
      instructions: 'Machaca el aguacate, mezcla con miel y aceite. Aplica por 15 minutos.',
      benefits: 'Hidrata profundamente y aporta vitaminas A y E',
      skinType: 'Piel seca',
      frequency: '2 veces por semana'
    },
    {
      id: 'coffee-coconut',
      name: 'Exfoliante de Café y Coco',
      ingredients: ['2 cucharadas de café molido', '1 cucharada de aceite de coco', '1 cucharadita de azúcar morena'],
      instructions: 'Mezcla ingredientes. Masajea suavemente en círculos por 2 minutos.',
      benefits: 'Exfolia y mejora la circulación',
      skinType: 'Todo tipo de piel',
      frequency: '1 vez por semana'
    },
    {
      id: 'aloe-cucumber',
      name: 'Gel de Aloe y Pepino',
      ingredients: ['2 cucharadas de gel de aloe vera', '1/2 pepino licuado', 'Unas gotas de agua de rosas'],
      instructions: 'Mezcla todos los ingredientes. Aplica y deja actuar 20 minutos.',
      benefits: 'Calma irritaciones y reduce inflamación',
      skinType: 'Piel sensible o irritada',
      frequency: '3 veces por semana'
    },
    {
      id: 'oatmeal-yogurt',
      name: 'Mascarilla de Avena y Yogurt',
      ingredients: ['2 cucharadas de avena molida', '2 cucharadas de yogurt natural', '1 cucharadita de miel'],
      instructions: 'Mezcla hasta formar pasta. Aplica por 15 minutos y retira con agua tibia.',
      benefits: 'Exfolia suavemente y equilibra el pH',
      skinType: 'Piel mixta',
      frequency: '2 veces por semana'
    },
    {
      id: 'turmeric-milk',
      name: 'Mascarilla de Cúrcuma y Leche',
      ingredients: ['1 cucharadita de cúrcuma', '2 cucharadas de leche', '1 cucharadita de miel'],
      instructions: 'Mezcla hasta formar pasta suave. Aplica por 10 minutos.',
      benefits: 'Propiedades antiinflamatorias y antioxidantes',
      skinType: 'Piel con imperfecciones',
      frequency: '1 vez por semana'
    },
    {
      id: 'banana-honey',
      name: 'Mascarilla de Plátano y Miel',
      ingredients: ['1 plátano maduro', '1 cucharada de miel', 'Unas gotas de limón'],
      instructions: 'Machaca el plátano, añade miel y limón. Aplica por 15 minutos.',
      benefits: 'Nutre y suaviza la piel',
      skinType: 'Piel normal a seca',
      frequency: '2 veces por semana'
    }
  ]

  const mealPlans = {
    'weight-loss': {
      title: 'Plan para Bajar de Peso',
      goal: 'Pérdida de grasa corporal saludable y sostenible',
      duration: '4 semanas',
      calories: '1200-1400 cal/día',
      benefits: ['Pérdida de peso gradual', 'Mejora del metabolismo', 'Reducción de grasa abdominal', 'Mayor energía'],
      dailyPlan: {
        breakfast: { meal: 'Smoothie verde + 1 arepa integral', calories: '280 cal' },
        snack1: { meal: 'Yogurt griego con fresas', calories: '120 cal' },
        lunch: { meal: 'Ensalada de pollo con quinoa', calories: '350 cal' },
        snack2: { meal: 'Té verde + almendras (10 unidades)', calories: '80 cal' },
        dinner: { meal: 'Pescado a la plancha + verduras', calories: '300 cal' }
      },
      tips: [
        'Bebe 2-3 litros de agua diariamente',
        'Evita azúcares refinados y harinas blancas',
        'Come cada 3-4 horas para mantener el metabolismo activo',
        'Incluye proteína en cada comida',
        'Realiza 30 minutos de ejercicio cardiovascular'
      ]
    },
    'toning': {
      title: 'Plan para Tonificar el Cuerpo',
      goal: 'Definición muscular y reducción de grasa localizada',
      duration: '6 semanas',
      calories: '1400-1600 cal/día',
      benefits: ['Definición muscular', 'Reducción de grasa', 'Aumento de fuerza', 'Mejor composición corporal'],
      dailyPlan: {
        breakfast: { meal: 'Panqueques de avena + frutas', calories: '320 cal' },
        snack1: { meal: 'Batido de proteína con plátano', calories: '150 cal' },
        lunch: { meal: 'Pollo con quinoa y verduras', calories: '400 cal' },
        snack2: { meal: 'Hummus con vegetales', calories: '100 cal' },
        dinner: { meal: 'Salmón + batata + ensalada', calories: '380 cal' }
      },
      tips: [
        'Consume 1.5-2g de proteína por kg de peso corporal',
        'Incluye carbohidratos complejos antes del entrenamiento',
        'Realiza ejercicios de fuerza 4-5 veces por semana',
        'Descansa adecuadamente para la recuperación muscular',
        'Mantén un déficit calórico moderado'
      ]
    },
    'energy': {
      title: 'Plan para Mantener Energía',
      goal: 'Energía sostenida y bienestar general',
      duration: 'Estilo de vida',
      calories: '1600-1800 cal/día',
      benefits: ['Energía constante', 'Mejor estado de ánimo', 'Digestión saludable', 'Bienestar general'],
      dailyPlan: {
        breakfast: { meal: 'Avena con frutas + café', calories: '350 cal' },
        snack1: { meal: 'Frutos secos y frutas', calories: '140 cal' },
        lunch: { meal: 'Bowl de quinoa con vegetales', calories: '420 cal' },
        snack2: { meal: 'Yogurt con granola', calories: '160 cal' },
        dinner: { meal: 'Pollo + arroz integral + ensalada', calories: '450 cal' }
      },
      tips: [
        'Mantén horarios regulares de comida',
        'Incluye grasas saludables en cada comida',
        'Consume carbohidratos complejos',
        'Evita picos de azúcar en sangre',
        'Realiza ejercicio moderado regularmente'
      ]
    }
  }

  const workoutCategories = [
    {
      name: 'Cardio en Casa',
      exercises: allExercises.filter(ex => ex.category === 'Cardio en Casa'),
      color: 'from-emerald-400 to-teal-500',
      icon: Activity
    },
    {
      name: 'Abdomen y Core',
      exercises: allExercises.filter(ex => ex.category === 'Abdomen y Core'),
      color: 'from-green-400 to-emerald-500',
      icon: Target
    },
    {
      name: 'Glúteos y Piernas',
      exercises: allExercises.filter(ex => ex.category === 'Glúteos y Piernas'),
      color: 'from-teal-400 to-cyan-500',
      icon: Zap
    },
    {
      name: 'Brazos y Espalda',
      exercises: allExercises.filter(ex => ex.category === 'Brazos y Espalda'),
      color: 'from-green-500 to-teal-600',
      icon: Dumbbell
    },
    {
      name: 'Cuerpo Completo Express',
      exercises: allExercises.filter(ex => ex.category === 'Cuerpo Completo Express'),
      color: 'from-emerald-500 to-green-600',
      icon: Zap
    }
  ]

  const breathingExercises = [
    {
      name: 'Respiración 4-7-8',
      description: 'Inhala 4 segundos, mantén 7 segundos, exhala 8 segundos',
      benefit: 'Reduce ansiedad y estrés',
      duration: '5 minutos'
    },
    {
      name: 'Respiración Profunda',
      description: 'Inhala lento por la nariz, exhala lentamente por la boca',
      benefit: 'Calma la mente y relaja el cuerpo',
      duration: '10 minutos'
    },
    {
      name: 'Respiración Cuadrada',
      description: 'Inhala 4, mantén 4, exhala 4, pausa 4 segundos',
      benefit: 'Mejora concentración y equilibrio',
      duration: '8 minutos'
    },
    {
      name: 'Respiración Alternada',
      description: 'Alterna respiración entre fosas nasales',
      benefit: 'Equilibra el sistema nervioso',
      duration: '6 minutos'
    }
  ]

  const renderNavigation = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 px-4 py-2 z-50 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {[
          { id: 'home', icon: Home, label: 'Inicio' },
          { id: 'recipes', icon: ChefHat, label: 'Recetas' },
          { id: 'meals', icon: Apple, label: 'Planes' },
          { id: 'skincare', icon: Sparkles, label: 'Belleza' },
          { id: 'workouts', icon: Dumbbell, label: 'Ejercicios' },
          { id: 'wellness', icon: Smile, label: 'Bienestar' }
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setCurrentSection(id as Section)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              currentSection === id 
                ? 'text-green-600 bg-green-50' 
                : 'text-gray-500 hover:text-green-600'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )

  const renderHeader = (title: string, showBack = false) => (
    <header className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-b-3xl mb-6 shadow-lg">
      <div className="flex items-center justify-between">
        {showBack && (
          <button 
            onClick={() => {
              if (currentSection === 'meal-plan') {
                setCurrentSection('meals')
              } else if (currentSection === 'workout-routine') {
                setCurrentSection('workouts')
              } else if (currentSection === 'weekly-routine') {
                setCurrentSection('workouts')
              } else {
                setCurrentSection('home')
              }
            }}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="text-xl font-bold text-center flex-1">{title}</h1>
        <div className="w-10" />
      </div>
    </header>
  )

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-20">
      {/* Header with Logo */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-b-3xl mb-6 shadow-lg">
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-white/20 p-3 rounded-full mr-3">
              <Leaf size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold">Vive Fit</h1>
          </div>
          <p className="text-white/90 leading-relaxed text-lg">
            Tu bienestar comienza aquí 🌿
          </p>
          <p className="text-white/80 text-sm mt-2">
            ¡Bienvenida a tu espacio de salud, belleza y bienestar!
          </p>
        </div>
      </div>

      <div className="px-4 space-y-6">
        {/* Motivational message */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100">
          <div className="flex items-center mb-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-full">
              <Heart className="text-white" size={20} />
            </div>
            <h3 className="font-bold text-gray-800 ml-3">Mensaje Motivacional</h3>
          </div>
          <p className="text-gray-700 leading-relaxed font-medium">{randomMessage}</p>
        </div>

        {/* Tip of the day */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-emerald-100">
          <div className="flex items-center mb-3">
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-2 rounded-full">
              <Zap className="text-white" size={20} />
            </div>
            <h3 className="font-bold text-gray-800 ml-3">Consejo del Día</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">{randomTip}</p>
        </div>

        {/* Quick access sections */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'recipes', icon: ChefHat, title: 'Recetas Fit', subtitle: 'Comida sabrosa y saludable', color: 'from-green-400 to-emerald-500' },
            { id: 'skincare', icon: Sparkles, title: 'Cuidado Natural', subtitle: 'Belleza desde adentro', color: 'from-emerald-400 to-teal-500' },
            { id: 'workouts', icon: Dumbbell, title: 'Entrenamientos', subtitle: 'Transforma tu cuerpo', color: 'from-teal-400 to-cyan-500' },
            { id: 'wellness', icon: Smile, title: 'Bienestar', subtitle: 'Mente y alma sanas', color: 'from-green-500 to-emerald-600' }
          ].map(({ id, icon: Icon, title, subtitle, color }) => (
            <button
              key={id}
              onClick={() => setCurrentSection(id as Section)}
              className={`bg-gradient-to-br ${color} text-white p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform`}
            >
              <Icon size={32} className="mb-3 mx-auto" />
              <h3 className="font-bold text-sm mb-1">{title}</h3>
              <p className="text-xs opacity-90">{subtitle}</p>
            </button>
          ))}
        </div>

        {/* Stats section */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-green-100">
          <h3 className="font-bold text-gray-800 mb-4 text-center">Tu Progreso Hoy</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Heart className="text-green-600" size={20} />
              </div>
              <p className="text-xs text-gray-600 font-medium">Amor propio</p>
            </div>
            <div>
              <div className="bg-emerald-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Target className="text-emerald-600" size={20} />
              </div>
              <p className="text-xs text-gray-600 font-medium">Metas</p>
            </div>
            <div>
              <div className="bg-teal-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Leaf className="text-teal-600" size={20} />
              </div>
              <p className="text-xs text-gray-600 font-medium">Bienestar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRecipes = () => {
    const categories = [...new Set(allRecipes.map(recipe => recipe.category))]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-20">
        {renderHeader('Recetas Fitness', true)}
        
        <div className="px-4">
          <div className="text-center mb-6">
            <p className="text-green-600 font-semibold text-lg">Come sabroso, sin culpa y con energía</p>
            <p className="text-gray-600 text-sm mt-2">Recetas colombianas saludables para cada momento del día</p>
          </div>

          {/* Recipe categories */}
          <div className="space-y-6">
            {categories.map(category => (
              <div key={category}>
                <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center">
                  <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></div>
                  {category}
                </h3>
                <div className="space-y-4">
                  {allRecipes.filter(recipe => recipe.category === category).map((recipe) => (
                    <div key={recipe.id} className="bg-white rounded-2xl p-4 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-lg">{recipe.name}</h4>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-green-600 font-semibold text-sm">{recipe.calories}</span>
                            <span className="text-gray-500 text-sm flex items-center">
                              <Clock size={14} className="mr-1" />
                              {recipe.time}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleFavorite(recipe.id)}
                          className={`p-2 rounded-full transition-colors ${
                            favorites.includes(recipe.id) 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
                          }`}
                        >
                          <Heart size={16} fill={favorites.includes(recipe.id) ? 'currentColor' : 'none'} />
                        </button>
                      </div>

                      <div className="mb-3">
                        <h5 className="font-semibold text-gray-700 mb-2">Ingredientes:</h5>
                        <div className="flex flex-wrap gap-2">
                          {recipe.ingredients.map((ingredient, index) => (
                            <span key={index} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-3">
                        <h5 className="font-semibold text-gray-700 mb-2">Preparación:</h5>
                        <p className="text-gray-600 text-sm leading-relaxed">{recipe.instructions}</p>
                      </div>

                      <div className="bg-green-50 p-3 rounded-xl">
                        <p className="text-green-700 text-sm font-medium">💡 {recipe.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderMealPlan = () => {
    if (!currentMealPlan) return null
    
    const plan = mealPlans[currentMealPlan]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-20">
        {renderHeader(plan.title, true)}
        
        <div className="px-4 space-y-6">
          {/* Plan overview */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="text-center mb-4">
              <h3 className="font-bold text-gray-800 text-xl mb-2">{plan.goal}</h3>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Calendar size={16} className="mr-1 text-green-600" />
                  {plan.duration}
                </span>
                <span className="flex items-center">
                  <Target size={16} className="mr-1 text-green-600" />
                  {plan.calories}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {plan.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-green-600 mr-2 flex-shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* Daily meal plan */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <h3 className="font-bold text-gray-800 text-lg mb-4 text-center">Plan Diario de Comidas</h3>
            <div className="space-y-4">
              {Object.entries(plan.dailyPlan).map(([mealTime, meal]) => {
                const mealIcons = {
                  breakfast: Sun,
                  snack1: Coffee,
                  lunch: Utensils,
                  snack2: Apple,
                  dinner: Moon
                }
                const mealNames = {
                  breakfast: 'Desayuno',
                  snack1: 'Media Mañana',
                  lunch: 'Almuerzo',
                  snack2: 'Media Tarde',
                  dinner: 'Cena'
                }
                const Icon = mealIcons[mealTime as keyof typeof mealIcons]
                
                return (
                  <div key={mealTime} className="flex items-center p-3 bg-green-50 rounded-xl">
                    <div className="bg-green-600 p-2 rounded-full mr-3">
                      <Icon size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm">{mealNames[mealTime as keyof typeof mealNames]}</h4>
                      <p className="text-gray-600 text-sm">{meal.meal}</p>
                    </div>
                    <span className="text-green-600 font-bold text-sm">{meal.calories}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Lifestyle tips */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Consejos para el Éxito</h3>
            <div className="space-y-3">
              {plan.tips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl text-center">
            <h3 className="font-bold text-lg mb-2">¡Comienza Hoy!</h3>
            <p className="text-white/90 text-sm mb-4">
              Sigue este plan y verás resultados en pocas semanas
            </p>
            <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full font-semibold transition-colors">
              Descargar Lista de Compras
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderMeals = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-20">
      {renderHeader('Planes Alimenticios', true)}
      
      <div className="px-4 space-y-6">
        <div className="text-center mb-6">
          <p className="text-green-600 font-semibold text-lg">Planes personalizados para tus objetivos</p>
          <p className="text-gray-600 text-sm mt-2">Elige el plan que mejor se adapte a tu meta</p>
        </div>

        <div className="grid gap-4">
          {[
            { 
              id: 'weight-loss',
              title: 'Bajar de Peso', 
              subtitle: 'Plan diseñado para pérdida de grasa saludable',
              color: 'from-green-400 to-emerald-500',
              icon: Target,
              calories: '1200-1400 cal/día',
              duration: '4 semanas'
            },
            { 
              id: 'toning',
              title: 'Tonificar el Cuerpo', 
              subtitle: 'Alimentación para definir músculos',
              color: 'from-emerald-400 to-teal-500',
              icon: Dumbbell,
              calories: '1400-1600 cal/día',
              duration: '6 semanas'
            },
            { 
              id: 'energy',
              title: 'Mantener Energía', 
              subtitle: 'Plan equilibrado para el día a día',
              color: 'from-teal-400 to-cyan-500',
              icon: Zap,
              calories: '1600-1800 cal/día',
              duration: 'Estilo de vida'
            }
          ].map((plan) => (
            <div key={plan.id} className={`bg-gradient-to-r ${plan.color} text-white p-6 rounded-2xl shadow-lg`}>
              <div className="flex items-center mb-4">
                <plan.icon size={28} className="mr-3" />
                <div className="flex-1">
                  <h3 className="font-bold text-xl">{plan.title}</h3>
                  <p className="text-white/90 text-sm">{plan.subtitle}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-white/80">Calorías diarias</p>
                  <p className="font-semibold">{plan.calories}</p>
                </div>
                <div>
                  <p className="text-white/80">Duración</p>
                  <p className="font-semibold">{plan.duration}</p>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setCurrentMealPlan(plan.id as MealPlan)
                  setCurrentSection('meal-plan')
                }}
                className="w-full bg-white/20 hover:bg-white/30 px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
              >
                Ver Plan Completo
              </button>
            </div>
          ))}
        </div>

        {/* Substitutions section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">Sustituciones Locales Saludables</h3>
          <div className="space-y-4">
            {[
              { from: 'Arroz blanco', to: 'Quinoa o arroz integral', benefit: 'Más fibra y proteína', color: 'green' },
              { from: 'Plátano verde frito', to: 'Plátano verde al horno', benefit: 'Menos grasa, mismos nutrientes', color: 'emerald' },
              { from: 'Pan común', to: 'Pan integral o arepa', benefit: 'Más nutrientes y fibra', color: 'teal' },
              { from: 'Azúcar refinada', to: 'Panela o miel', benefit: 'Minerales naturales', color: 'green' },
              { from: 'Aceite común', to: 'Aceite de oliva o coco', benefit: 'Grasas más saludables', color: 'emerald' }
            ].map((sub, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <p className="text-sm text-gray-700">
                    <span className="line-through text-gray-500">{sub.from}</span> 
                    <span className="mx-2">→</span> 
                    <span className={`font-semibold text-${sub.color}-600`}>{sub.to}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{sub.benefit}</p>
                </div>
                <CheckCircle2 size={20} className={`text-${sub.color}-600`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderSkincare = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-20">
      {renderHeader('Cuidado Natural', true)}
      
      <div className="px-4 space-y-6">
        <div className="text-center mb-6">
          <p className="text-emerald-600 font-semibold text-lg">Cuida tu piel con ingredientes naturales</p>
          <p className="text-gray-600 text-sm mt-2">Rutinas y tratamientos caseros para una piel radiante</p>
        </div>

        {/* Daily routines */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 text-lg flex items-center">
            <div className="w-2 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full mr-3"></div>
            Rutinas Diarias
          </h3>
          {skincareRoutines.map((routine) => (
            <div key={routine.id} className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-gray-800 text-lg">{routine.name}</h4>
                <div className="text-right">
                  <span className="text-emerald-600 text-sm font-semibold">{routine.time}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 italic">{routine.benefits}</p>
              
              <div className="space-y-3">
                {routine.steps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Natural masks */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-800 text-lg flex items-center">
            <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></div>
            Mascarillas y Tratamientos Naturales
          </h3>
          {naturalMasks.map((mask) => (
            <div key={mask.id} className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-gray-800 text-lg">{mask.name}</h4>
                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                    {mask.skinType}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{mask.frequency}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="font-semibold text-gray-700 mb-2">Ingredientes:</h5>
                <div className="grid grid-cols-1 gap-2">
                  {mask.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {ingredient}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h5 className="font-semibold text-gray-700 mb-2">Instrucciones:</h5>
                <p className="text-gray-600 text-sm leading-relaxed">{mask.instructions}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-green-700 text-sm font-medium">✨ {mask.benefits}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Post-workout tip */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl">
          <h3 className="font-bold mb-3 text-lg">💡 Cuidado Post-Entrenamiento</h3>
          <p className="text-white/90 text-sm leading-relaxed mb-4">
            Después de ejercitarte, es crucial limpiar tu rostro inmediatamente para evitar que el sudor obstruya los poros.
          </p>
          <div className="bg-white/20 p-4 rounded-xl">
            <h4 className="font-semibold mb-2">Rutina Express (2 minutos):</h4>
            <ol className="text-sm space-y-1 text-white/90">
              <li>1. Limpia con toallitas sin alcohol</li>
              <li>2. Aplica tónico refrescante</li>
              <li>3. Hidrata con gel ligero</li>
              <li>4. Protector solar si es de día</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )

  const renderWorkoutRoutine = () => {
    if (!isWorkoutActive || currentWorkout.length === 0) return null

    const completedCount = completedExercises.length
    const totalExercises = currentWorkout.length
    const progress = (completedCount / totalExercises) * 100

    if (workoutCompleted) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-20 flex items-center justify-center">
          <div className="px-4 w-full max-w-md">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100 text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Award size={40} className="text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🎉 ¡Excelente trabajo!
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Has completado tu rutina de hoy. ¡Cada día te acercas más a tu mejor versión!
              </p>
              
              <div className="bg-green-50 p-4 rounded-xl mb-6">
                <p className="text-green-700 font-semibold">
                  {randomMessage}
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={resetWorkout}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
                >
                  Volver a Entrenamientos
                </button>
                
                <button
                  onClick={() => {
                    setCurrentSection('wellness')
                    resetWorkout()
                  }}
                  className="w-full bg-green-100 text-green-700 py-3 rounded-xl font-semibold hover:bg-green-200 transition-colors"
                >
                  Ver Consejos de Bienestar
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-20">
        {renderHeader('Rutina en Progreso', true)}
        
        <div className="px-4 space-y-6">
          {/* Timer and progress */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Timer size={32} />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {formatTime(workoutTimer)}
              </h3>
              
              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                    isTimerRunning 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause size={16} className="inline mr-2" />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play size={16} className="inline mr-2" />
                      Continuar
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setWorkoutTimer(900)}
                  className="px-6 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 font-semibold transition-colors"
                >
                  <RotateCcw size={16} className="inline mr-2" />
                  Reiniciar
                </button>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              <p className="text-sm text-gray-600">
                {completedCount} de {totalExercises} ejercicios completados
              </p>
            </div>
          </div>

          {/* Exercise list */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Lista de Ejercicios</h3>
            
            <div className="space-y-3">
              {currentWorkout.map((exercise, index) => {
                const isCompleted = completedExercises.includes(exercise.id)
                
                return (
                  <div 
                    key={exercise.id}
                    className={`flex items-center p-4 rounded-xl border-2 transition-all ${
                      isCompleted 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleExerciseComplete(exercise.id)}
                      className={`mr-4 transition-colors ${
                        isCompleted ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </button>
                    
                    <div className="flex-1">
                      <h4 className={`font-semibold ${isCompleted ? 'text-green-800 line-through' : 'text-gray-800'}`}>
                        {exercise.name}
                      </h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {exercise.duration}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          exercise.difficulty === 'Fácil' 
                            ? 'bg-green-100 text-green-700'
                            : exercise.difficulty === 'Medio'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{exercise.muscles}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Complete workout button */}
          {completedCount === totalExercises && (
            <button
              onClick={completeWorkout}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
            >
              <Check size={20} className="inline mr-2" />
              Marcar Rutina como Completada
            </button>
          )}
        </div>
      </div>
    )
  }

  const renderWorkouts = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-20">
      {renderHeader('Entrenamientos', true)}
      
      <div className="px-4 space-y-6">
        <div className="text-center mb-6">
          <p className="text-teal-600 font-semibold text-lg">Transforma tu cuerpo desde tu sala</p>
          <p className="text-gray-600 text-sm mt-2">Ejercicios organizados por grupos musculares</p>
        </div>

        {/* Weekly routine section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 text-lg">Mi Rutina Semanal</h3>
            <Calendar className="text-green-600" size={24} />
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Crea tu rutina personalizada y recibe recordatorios diarios para mantenerte motivada
          </p>
          <button 
            onClick={() => setCurrentSection('weekly-routine')}
            className="w-full bg-green-100 text-green-700 py-3 rounded-xl font-semibold hover:bg-green-200 transition-colors"
          >
            Crear Mi Rutina Semanal
          </button>
        </div>

        {/* Exercise categories */}
        <div className="space-y-6">
          {workoutCategories.map((category) => (
            <div key={category.name}>
              <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
                <div className={`w-2 h-6 bg-gradient-to-b ${category.color} rounded-full mr-3`}></div>
                {category.name}
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {category.exercises.length} ejercicios
                </span>
              </h3>
              
              <div className="grid gap-4">
                {category.exercises.map((exercise) => (
                  <div key={exercise.id} className="bg-white rounded-2xl p-4 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 text-lg">{exercise.name}</h4>
                        <p className="text-gray-600 text-sm mt-1">{exercise.muscles}</p>
                      </div>
                      <div className={`p-2 rounded-full ${category.color.replace('from-', 'bg-').replace(' to-emerald-500', '').replace(' to-teal-500', '').replace(' to-cyan-500', '').replace(' to-green-600', '')}`}>
                        <category.icon size={20} className="text-white" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center">
                        <Clock size={16} className="text-green-600 mr-1" />
                        <span className="text-sm font-medium text-gray-700">{exercise.duration}</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        exercise.difficulty === 'Fácil' 
                          ? 'bg-green-100 text-green-700'
                          : exercise.difficulty === 'Medio'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {exercise.difficulty}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Start category workout button */}
                <button
                  onClick={() => startWorkout(category.exercises)}
                  className={`w-full bg-gradient-to-r ${category.color} text-white py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg`}
                >
                  <Play size={20} className="inline mr-2" />
                  Comenzar Rutina de {category.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick workout options */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <h3 className="font-bold text-gray-800 text-lg mb-4">Rutinas Express</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: '10 Min Cardio', exercises: allExercises.filter(ex => ex.category === 'Cardio en Casa').slice(0, 4), color: 'from-green-400 to-emerald-500' },
              { name: '15 Min Core', exercises: allExercises.filter(ex => ex.category === 'Abdomen y Core'), color: 'from-emerald-400 to-teal-500' },
              { name: '12 Min Glúteos', exercises: allExercises.filter(ex => ex.category === 'Glúteos y Piernas').slice(0, 4), color: 'from-teal-400 to-cyan-500' },
              { name: '8 Min Full Body', exercises: allExercises.filter(ex => ex.category === 'Cuerpo Completo Express'), color: 'from-green-500 to-emerald-600' }
            ].map((workout, index) => (
              <button
                key={index}
                onClick={() => startWorkout(workout.exercises)}
                className={`bg-gradient-to-r ${workout.color} text-white p-4 rounded-xl font-semibold hover:scale-105 transition-transform text-sm`}
              >
                <Play size={16} className="mb-2 mx-auto" />
                {workout.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderWeeklyRoutine = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-20">
      {renderHeader('Mi Rutina Semanal', true)}
      
      <div className="px-4 space-y-6">
        <div className="text-center mb-6">
          <p className="text-green-600 font-semibold text-lg">Planifica tu semana fitness</p>
          <p className="text-gray-600 text-sm mt-2">Crea una rutina personalizada que se adapte a tu horario</p>
        </div>

        {/* Weekly calendar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <h3 className="font-bold text-gray-800 text-lg mb-4">Planificador Semanal</h3>
          
          <div className="space-y-3">
            {[
              { day: 'Lunes', key: 'monday' },
              { day: 'Martes', key: 'tuesday' },
              { day: 'Miércoles', key: 'wednesday' },
              { day: 'Jueves', key: 'thursday' },
              { day: 'Viernes', key: 'friday' },
              { day: 'Sábado', key: 'saturday' },
              { day: 'Domingo', key: 'sunday' }
            ].map(({ day, key }) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    {day.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-800">{day}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {weeklyRoutine[key] ? (
                    <span className="text-green-600 text-sm font-medium">
                      {weeklyRoutine[key].length} ejercicio(s)
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">Descanso</span>
                  )}
                  
                  <button className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-green-200 transition-colors">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick setup options */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <h3 className="font-bold text-gray-800 text-lg mb-4">Rutinas Predefinidas</h3>
          <p className="text-gray-600 text-sm mb-4">Elige una rutina base y personalízala según tus necesidades</p>
          
          <div className="space-y-3">
            {[
              {
                name: 'Principiante (3 días)',
                description: 'Lunes, Miércoles, Viernes - 20 min cada día',
                color: 'from-green-400 to-emerald-500'
              },
              {
                name: 'Intermedio (4 días)',
                description: 'Lunes, Martes, Jueves, Viernes - 25 min cada día',
                color: 'from-emerald-400 to-teal-500'
              },
              {
                name: 'Avanzado (5 días)',
                description: 'Lunes a Viernes - 30 min cada día',
                color: 'from-teal-400 to-cyan-500'
              }
            ].map((routine, index) => (
              <button
                key={index}
                className={`w-full bg-gradient-to-r ${routine.color} text-white p-4 rounded-xl text-left hover:scale-105 transition-transform`}
              >
                <h4 className="font-bold mb-1">{routine.name}</h4>
                <p className="text-white/90 text-sm">{routine.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications settings */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <h3 className="font-bold text-gray-800 text-lg mb-4">Recordatorios</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Recordatorios diarios</p>
                <p className="text-gray-600 text-sm">Recibe notificaciones para no olvidar tu rutina</p>
              </div>
              <div className="bg-green-600 w-12 h-6 rounded-full relative">
                <div className="bg-white w-5 h-5 rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">Mensajes motivacionales</p>
                <p className="text-gray-600 text-sm">Frases inspiradoras para mantenerte motivada</p>
              </div>
              <div className="bg-green-600 w-12 h-6 rounded-full relative">
                <div className="bg-white w-5 h-5 rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress tracking */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-3">Tu Progreso Esta Semana</h3>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-white/80 text-sm">Días completados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">75</div>
              <div className="text-white/80 text-sm">Minutos totales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-white/80 text-sm">Ejercicios hechos</div>
            </div>
          </div>
          
          <div className="bg-white/20 p-4 rounded-xl">
            <p className="text-white/90 text-sm">
              ¡Vas muy bien! Mantén la constancia y verás resultados increíbles. 
              Recuerda que cada día cuenta hacia tu objetivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderWellness = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-20">
      {renderHeader('Bienestar', true)}
      
      <div className="px-4 space-y-6">
        {/* Motivational message */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-2xl text-center shadow-lg">
          <h3 className="font-bold text-xl mb-3">Frase del Día</h3>
          <p className="text-white/90 leading-relaxed text-lg">
            "{randomMessage}"
          </p>
          <div className="mt-4 flex justify-center">
            <div className="bg-white/20 p-2 rounded-full">
              <Heart size={24} />
            </div>
          </div>
        </div>

        {/* Breathing exercises */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
            <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></div>
            Ejercicios de Respiración
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Técnicas simples para reducir el estrés y encontrar tu centro interior
          </p>
          
          <div className="space-y-4">
            {breathingExercises.map((exercise, index) => (
              <div key={index} className="p-4 bg-green-50 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{exercise.name}</h4>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                    {exercise.duration}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{exercise.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-700 text-xs font-medium">✨ {exercise.benefit}</span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-green-700 transition-colors">
                    Comenzar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly challenges */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
            <div className="w-2 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full mr-3"></div>
            Desafíos de la Semana
          </h3>
          
          <div className="space-y-4">
            {[
              { 
                title: '7 Días de Amor Propio', 
                description: 'Cada día dedica 10 minutos a hacer algo que te haga feliz',
                progress: 4,
                total: 7,
                color: 'from-green-400 to-emerald-500',
                icon: Heart
              },
              { 
                title: 'Reto 10 Minutos Diarios', 
                description: 'Ejercítate al menos 10 minutos cada día',
                progress: 6,
                total: 7,
                color: 'from-emerald-400 to-teal-500',
                icon: Activity
              },
              { 
                title: 'Hidratación Consciente', 
                description: 'Bebe 8 vasos de agua diariamente',
                progress: 5,
                total: 7,
                color: 'from-teal-400 to-cyan-500',
                icon: Zap
              }
            ].map((challenge, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start">
                    <div className={`bg-gradient-to-r ${challenge.color} p-2 rounded-full mr-3 mt-1`}>
                      <challenge.icon size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">{challenge.progress}/{challenge.total}</p>
                    <p className="text-xs text-gray-500">días</p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`bg-gradient-to-r ${challenge.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {Math.round((challenge.progress / challenge.total) * 100)}% completado
                  </span>
                  <button className="text-green-600 font-medium hover:text-green-700">
                    Marcar hoy ✓
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Self-care tips */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
          <h3 className="font-bold text-gray-800 text-lg mb-4">Consejos de Autocuidado</h3>
          
          <div className="space-y-3">
            {[
              { tip: 'Dedica 5 minutos cada mañana a establecer intenciones positivas para el día', icon: Sun },
              { tip: 'Practica la gratitud escribiendo 3 cosas por las que te sientes agradecida', icon: Heart },
              { tip: 'Toma descansos regulares durante el día para respirar profundamente', icon: Smile },
              { tip: 'Crea un ritual nocturno relajante para mejorar la calidad de tu sueño', icon: Moon }
            ].map((item, index) => (
              <div key={index} className="flex items-start p-3 bg-green-50 rounded-xl">
                <div className="bg-green-600 p-2 rounded-full mr-3 mt-1">
                  <item.icon size={16} className="text-white" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community section */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-2xl">
          <div className="flex items-center mb-4">
            <Users size={28} className="mr-3" />
            <h3 className="font-bold text-xl">Comunidad Vive Fit</h3>
          </div>
          <p className="text-white/90 text-sm mb-4 leading-relaxed">
            Únete a nuestra comunidad de mujeres que se apoyan mutuamente en su journey fitness. 
            Comparte tus logros, encuentra motivación y crea conexiones auténticas.
          </p>
          
          <div className="bg-white/20 p-4 rounded-xl mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/90 text-sm">Miembros activas hoy</span>
              <span className="font-bold">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/90 text-sm">Rutinas completadas esta semana</span>
              <span className="font-bold">3,891</span>
            </div>
          </div>
          
          <button className="w-full bg-white/20 hover:bg-white/30 px-4 py-3 rounded-xl text-sm font-semibold transition-colors">
            Unirse a la Comunidad
          </button>
        </div>
      </div>
    </div>
  )

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return renderHome()
      case 'recipes':
        return renderRecipes()
      case 'meals':
        return renderMeals()
      case 'meal-plan':
        return renderMealPlan()
      case 'skincare':
        return renderSkincare()
      case 'workouts':
        return renderWorkouts()
      case 'workout-routine':
        return renderWorkoutRoutine()
      case 'weekly-routine':
        return renderWeeklyRoutine()
      case 'wellness':
        return renderWellness()
      default:
        return renderHome()
    }
  }

  return (
    <div className="font-geist-sans">
      {renderCurrentSection()}
      {renderNavigation()}
    </div>
  )
}

// Wrapper for Next.js app router
export default function Page() {
  return (
    <ViveFitApp />
  )
}
