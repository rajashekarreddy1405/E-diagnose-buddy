
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, Heart, Brain, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const HealthAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  // Sample health trend data
  const healthTrends = [
    { month: 'Jan', diagnoses: 145, accuracy: 92, patients: 234 },
    { month: 'Feb', diagnoses: 168, accuracy: 94, patients: 267 },
    { month: 'Mar', diagnoses: 189, accuracy: 91, patients: 298 },
    { month: 'Apr', diagnoses: 203, accuracy: 95, patients: 324 },
    { month: 'May', diagnoses: 234, accuracy: 93, patients: 356 },
    { month: 'Jun', diagnoses: 267, accuracy: 96, patients: 389 }
  ];

  const conditionDistribution = [
    { name: 'Respiratory', value: 35, color: '#3b82f6' },
    { name: 'Cardiovascular', value: 25, color: '#ef4444' },
    { name: 'Neurological', value: 18, color: '#8b5cf6' },
    { name: 'Gastrointestinal', value: 12, color: '#10b981' },
    { name: 'Mental Health', value: 7, color: '#f59e0b' },
    { name: 'Endocrine', value: 3, color: '#06b6d4' }
  ];

  const ageGroupData = [
    { ageGroup: '0-18', count: 45, percentage: 12 },
    { ageGroup: '19-35', count: 156, percentage: 42 },
    { ageGroup: '36-50', count: 98, percentage: 26 },
    { ageGroup: '51-65', count: 54, percentage: 14 },
    { ageGroup: '65+', count: 23, percentage: 6 }
  ];

  const topConditions = [
    { condition: 'Common Cold', cases: 89, trend: 'up', change: '+12%' },
    { condition: 'Hypertension', cases: 67, trend: 'stable', change: '+2%' },
    { condition: 'Anxiety', cases: 45, trend: 'up', change: '+18%' },
    { condition: 'Migraine', cases: 38, trend: 'down', change: '-5%' },
    { condition: 'Diabetes', cases: 34, trend: 'up', change: '+8%' }
  ];

  const performanceMetrics = [
    { metric: 'Overall Accuracy', value: '94.8%', change: '+2.3%', trend: 'up' },
    { metric: 'Response Time', value: '1.2s', change: '-0.3s', trend: 'up' },
    { metric: 'Patient Satisfaction', value: '4.7/5', change: '+0.2', trend: 'up' },
    { metric: 'Correct Diagnoses', value: '2,847', change: '+234', trend: 'up' }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Activity className="w-4 h-4 text-gray-600" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">Health Analytics Dashboard</CardTitle>
                <p className="text-orange-100">Comprehensive health trends and insights</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {['3months', '6months', '1year'].map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className="text-white border-white/30"
                >
                  {timeframe === '3months' && '3M'}
                  {timeframe === '6months' && '6M'}
                  {timeframe === '1year' && '1Y'}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-600">{metric.metric}</div>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className={`text-sm ${getTrendColor(metric.trend)}`}>
                {metric.change} from last period
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Diagnosis Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Diagnosis Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={healthTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="diagnoses" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Condition Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Condition Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={conditionDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {conditionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Age Group Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Age Group Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageGroupData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Accuracy Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Accuracy Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={healthTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[85, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#ef4444" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Top Diagnosed Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topConditions.map((condition, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-semibold text-gray-600">#{index + 1}</div>
                  <div>
                    <div className="font-medium">{condition.condition}</div>
                    <div className="text-sm text-gray-600">{condition.cases} cases this month</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getTrendColor(condition.trend)}`}>
                    {condition.change}
                  </span>
                  {getTrendIcon(condition.trend)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights & Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-2">
              <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
              <p className="text-blue-700 text-sm">Respiratory conditions show 23% increase during winter months</p>
            </div>
            <div className="flex items-start space-x-2">
              <Heart className="w-5 h-5 text-blue-600 mt-0.5" />
              <p className="text-blue-700 text-sm">Mental health consultations peaked among 19-35 age group</p>
            </div>
            <div className="flex items-start space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
              <p className="text-blue-700 text-sm">Overall system accuracy improved by 2.3% this quarter</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-2">
              <Users className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="text-green-700 text-sm">Expand mental health resources for young adults</p>
            </div>
            <div className="flex items-start space-x-2">
              <Activity className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="text-green-700 text-sm">Prepare for seasonal respiratory condition surge</p>
            </div>
            <div className="flex items-start space-x-2">
              <Brain className="w-5 h-5 text-green-600 mt-0.5" />
              <p className="text-green-700 text-sm">Continue AI model training to maintain accuracy gains</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthAnalytics;
