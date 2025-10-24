import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const conversionData = [
  { name: 'Пн', leads: 45, converted: 28 },
  { name: 'Вт', leads: 52, converted: 35 },
  { name: 'Ср', leads: 38, converted: 22 },
  { name: 'Чт', leads: 61, converted: 41 },
  { name: 'Пт', leads: 55, converted: 38 },
  { name: 'Сб', leads: 28, converted: 15 },
  { name: 'Вс', leads: 22, converted: 12 }
];

const statusData = [
  { name: 'Новые', value: 145, color: '#8B5CF6' },
  { name: 'В работе', value: 89, color: '#D946EF' },
  { name: 'Конверсия', value: 67, color: '#0EA5E9' },
  { name: 'Отклонены', value: 34, color: '#F97316' }
];

const recentLeads = [
  { id: 1, name: 'Иван Петров', phone: '+7 (999) 123-45-67', status: 'new', priority: 'high', time: '2 мин назад' },
  { id: 2, name: 'Мария Сидорова', phone: '+7 (999) 234-56-78', status: 'in-progress', priority: 'medium', time: '15 мин назад' },
  { id: 3, name: 'Алексей Козлов', phone: '+7 (999) 345-67-89', status: 'new', priority: 'high', time: '23 мин назад' },
  { id: 4, name: 'Елена Васильева', phone: '+7 (999) 456-78-90', status: 'converted', priority: 'low', time: '1 час назад' },
  { id: 5, name: 'Дмитрий Новиков', phone: '+7 (999) 567-89-01', status: 'new', priority: 'medium', time: '1 час назад' }
];

const pricingPlans = [
  {
    name: 'Стартовый',
    price: '15 000',
    leads: '500',
    features: ['CRM интеграция', 'Базовая аналитика', 'Email поддержка', '1 оператор'],
    popular: false
  },
  {
    name: 'Профессиональный',
    price: '35 000',
    leads: '2 000',
    features: ['Все из Стартового', 'Расширенная аналитика', 'Приоритетная поддержка', '5 операторов', 'API доступ'],
    popular: true
  },
  {
    name: 'Корпоративный',
    price: '75 000',
    leads: 'Без лимитов',
    features: ['Все из Профессионального', 'Персональный менеджер', 'Кастомизация', 'Безлимит операторов', 'SLA 99.9%'],
    popular: false
  }
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'new': { label: 'Новый', variant: 'default' as const },
      'in-progress': { label: 'В работе', variant: 'secondary' as const },
      'converted': { label: 'Конверсия', variant: 'default' as const },
      'rejected': { label: 'Отклонен', variant: 'destructive' as const }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig['new'];
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') return <Icon name="TrendingUp" size={16} className="text-red-500" />;
    if (priority === 'medium') return <Icon name="Minus" size={16} className="text-yellow-500" />;
    return <Icon name="TrendingDown" size={16} className="text-green-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Icon name="Phone" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                LeadCenter Pro
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="gap-2">
                <Icon name="Bell" size={18} />
                <span className="hidden md:inline">Уведомления</span>
                <Badge className="ml-1 bg-red-500">3</Badge>
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Icon name="User" size={18} />
                <span className="hidden md:inline">Профиль</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-lg p-1 h-auto gap-2">
            <TabsTrigger value="dashboard" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="LayoutDashboard" size={18} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="leads" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="Users" size={18} />
              Лиды
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="BarChart3" size={18} />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="pricing" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="CreditCard" size={18} />
              Тарифы
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="UserCircle" size={18} />
              Кабинет
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Icon name="Mail" size={18} />
              Контакты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Активные лиды', value: '234', change: '+12%', icon: 'TrendingUp', color: 'from-purple-600 to-pink-600' },
                { title: 'Конверсия', value: '67', change: '+8%', icon: 'Target', color: 'from-blue-600 to-cyan-600' },
                { title: 'Средний чек', value: '₽24,500', change: '+15%', icon: 'DollarSign', color: 'from-orange-600 to-red-600' },
                { title: 'Звонков сегодня', value: '89', change: '+23%', icon: 'Phone', color: 'from-green-600 to-emerald-600' }
              ].map((stat, idx) => (
                <Card key={idx} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-none animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                      <h3 className="text-3xl font-bold mt-2 bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${stat.color.split(' ')[0].replace('from-', 'var(--')}, ${stat.color.split(' ')[1].replace('to-', 'var(--')})` }}>
                        {stat.value}
                      </h3>
                      <p className="text-sm text-green-600 font-semibold mt-1">{stat.change} за неделю</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center animate-pulse-glow`}>
                      <Icon name={stat.icon as any} size={24} className="text-white" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-none hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="LineChart" size={24} className="text-purple-600" />
                  Конверсия лидов
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                    <Legend />
                    <Line type="monotone" dataKey="leads" stroke="#8B5CF6" strokeWidth={3} name="Лиды" dot={{ fill: '#8B5CF6', r: 5 }} />
                    <Line type="monotone" dataKey="converted" stroke="#0EA5E9" strokeWidth={3} name="Конверсия" dot={{ fill: '#0EA5E9', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-none hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="PieChart" size={24} className="text-pink-600" />
                  Статусы лидов
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border-none hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Clock" size={24} className="text-blue-600" />
                Последние лиды
              </h3>
              <div className="space-y-3">
                {recentLeads.map((lead, idx) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{lead.name}</p>
                          {getPriorityIcon(lead.priority)}
                        </div>
                        <p className="text-sm text-gray-600">{lead.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={getStatusBadge(lead.status).variant}>{getStatusBadge(lead.status).label}</Badge>
                      <span className="text-sm text-gray-500 hidden md:inline">{lead.time}</span>
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        <Icon name="Phone" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="animate-fade-in">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-none">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Управление лидами</h2>
                <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Icon name="Plus" size={18} />
                  Добавить лид
                </Button>
              </div>
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{lead.name}</h4>
                          <p className="text-gray-600">{lead.phone}</p>
                          <p className="text-sm text-gray-500 mt-1">{lead.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getPriorityIcon(lead.priority)}
                        <Badge variant={getStatusBadge(lead.status).variant} className="text-sm px-4 py-1">
                          {getStatusBadge(lead.status).label}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                            <Icon name="Phone" size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-none">
                <h3 className="text-xl font-bold mb-4">Динамика продаж</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                    <Legend />
                    <Bar dataKey="leads" fill="#8B5CF6" radius={[8, 8, 0, 0]} name="Лиды" />
                    <Bar dataKey="converted" fill="#0EA5E9" radius={[8, 8, 0, 0]} name="Конверсии" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-none">
                <h3 className="text-xl font-bold mb-4">Ключевые метрики</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Конверсия в продажу', value: '28.7%', progress: 87, color: 'bg-purple-600' },
                    { label: 'Средний цикл сделки', value: '4.2 дня', progress: 65, color: 'bg-pink-600' },
                    { label: 'Качество лидов', value: '8.9/10', progress: 89, color: 'bg-blue-600' },
                    { label: 'Активность операторов', value: '94%', progress: 94, color: 'bg-orange-600' }
                  ].map((metric, idx) => (
                    <div key={idx} className="space-y-2 animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">{metric.label}</span>
                        <span className="font-bold text-lg">{metric.value}</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${metric.color} rounded-full transition-all duration-1000`} style={{ width: `${metric.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Выберите свой тариф
              </h2>
              <p className="text-gray-600 text-lg">Гибкие решения для бизнеса любого масштаба</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, idx) => (
                <Card key={idx} className={`p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-scale-in ${plan.popular ? 'border-4 border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50' : 'bg-white/80 backdrop-blur-sm border-none'}`} style={{ animationDelay: `${idx * 150}ms` }}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-1 text-sm font-bold rounded-bl-xl">
                      ПОПУЛЯРНЫЙ
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">₽{plan.price}</span>
                      <span className="text-gray-600">/мес</span>
                    </div>
                    <p className="text-sm text-gray-600">{plan.leads} лидов в месяц</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={14} className="text-white" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full py-6 text-lg font-semibold ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'bg-gray-900 hover:bg-gray-800'}`}>
                    Выбрать тариф
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-none">
              <div className="flex items-start gap-8">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-5xl font-bold">
                  АИ
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Александр Иванов</h2>
                    <p className="text-gray-600">Старший менеджер по продажам</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Email</p>
                        <p className="font-semibold">a.ivanov@company.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Телефон</p>
                        <p className="font-semibold">+7 (999) 123-45-67</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Конверсий за месяц</p>
                        <p className="font-semibold text-2xl text-purple-600">67</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Рейтинг</p>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Icon key={star} name="Star" size={20} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Редактировать профиль
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="animate-fade-in">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-none">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Свяжитесь с нами
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
                    <Icon name="Mail" size={32} className="text-purple-600 mb-3" />
                    <h3 className="font-bold mb-2">Email</h3>
                    <p className="text-gray-600">support@leadcenter.pro</p>
                  </div>
                  <div className="p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
                    <Icon name="Phone" size={32} className="text-pink-600 mb-3" />
                    <h3 className="font-bold mb-2">Телефон</h3>
                    <p className="text-gray-600">+7 (800) 555-35-35</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <input type="text" placeholder="Ваше имя" className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-purple-600 outline-none transition-colors" />
                  <input type="email" placeholder="Email" className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-purple-600 outline-none transition-colors" />
                  <textarea placeholder="Сообщение" rows={5} className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-purple-600 outline-none transition-colors resize-none" />
                  <Button className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Отправить сообщение
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
