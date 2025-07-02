
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Brain, Search, TrendingUp, Users, Clock, AlertTriangle } from "lucide-react";

interface DiagnosisData {
  id: string;
  condition: string;
  category: string;
  symptoms: string[];
  riskFactors: string[];
  prevalence: string;
  accuracy: number;
  commonAge: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

const DiagnosisCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const diagnosisData: DiagnosisData[] = [
    {
      id: '1',
      condition: 'Common Cold',
      category: 'Respiratory',
      symptoms: ['Runny nose', 'Sneezing', 'Cough', 'Mild fever', 'Fatigue'],
      riskFactors: ['Seasonal changes', 'Weakened immunity', 'Close contact'],
      prevalence: '2-3 times per year',
      accuracy: 95,
      commonAge: 'All ages',
      severity: 'low',
      description: 'Viral infection of the upper respiratory tract'
    },
    {
      id: '2',
      condition: 'Hypertension',
      category: 'Cardiovascular',
      symptoms: ['Headaches', 'Dizziness', 'Chest pain', 'Shortness of breath'],
      riskFactors: ['Age >40', 'Obesity', 'Sedentary lifestyle', 'High sodium diet'],
      prevalence: '45% of adults',
      accuracy: 88,
      commonAge: '40+ years',
      severity: 'high',
      description: 'Elevated blood pressure requiring management'
    },
    {
      id: '3',
      condition: 'Type 2 Diabetes',
      category: 'Endocrine',
      symptoms: ['Excessive thirst', 'Frequent urination', 'Fatigue', 'Blurred vision'],
      riskFactors: ['Obesity', 'Family history', 'Age >45', 'Sedentary lifestyle'],
      prevalence: '11% of adults',
      accuracy: 92,
      commonAge: '45+ years',
      severity: 'high',
      description: 'Metabolic disorder affecting blood sugar regulation'
    },
    {
      id: '4',
      condition: 'Migraine',
      category: 'Neurological',
      symptoms: ['Severe headache', 'Nausea', 'Light sensitivity', 'Visual disturbances'],
      riskFactors: ['Family history', 'Stress', 'Hormonal changes', 'Certain foods'],
      prevalence: '12% of population',
      accuracy: 89,
      commonAge: '20-50 years',
      severity: 'medium',
      description: 'Recurrent severe headaches with associated symptoms'
    },
    {
      id: '5',
      condition: 'Gastroenteritis',
      category: 'Gastrointestinal',
      symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal pain', 'Fever'],
      riskFactors: ['Food contamination', 'Poor hygiene', 'Travel', 'Contact with infected person'],
      prevalence: '1-2 episodes per year',
      accuracy: 91,
      commonAge: 'All ages',
      severity: 'medium',
      description: 'Inflammation of stomach and intestines'
    },
    {
      id: '6',
      condition: 'Anxiety Disorder',
      category: 'Mental Health',
      symptoms: ['Excessive worry', 'Restlessness', 'Fatigue', 'Sleep problems'],
      riskFactors: ['Stress', 'Trauma', 'Family history', 'Medical conditions'],
      prevalence: '18% of adults',
      accuracy: 85,
      commonAge: '18-65 years',
      severity: 'medium',
      description: 'Persistent excessive worry and fear'
    },
    {
      id: '7',
      condition: 'Pneumonia',
      category: 'Respiratory',
      symptoms: ['Cough with phlegm', 'Fever', 'Chills', 'Difficulty breathing'],
      riskFactors: ['Age >65', 'Weakened immunity', 'Chronic diseases', 'Smoking'],
      prevalence: '5-10 per 1000 adults',
      accuracy: 93,
      commonAge: '65+ years',
      severity: 'high',
      description: 'Infection causing inflammation in lung air sacs'
    },
    {
      id: '8',
      condition: 'Allergic Rhinitis',
      category: 'Respiratory',
      symptoms: ['Sneezing', 'Itchy eyes', 'Runny nose', 'Congestion'],
      riskFactors: ['Allergen exposure', 'Family history', 'Asthma', 'Environmental factors'],
      prevalence: '25% of population',
      accuracy: 90,
      commonAge: 'All ages',
      severity: 'low',
      description: 'Allergic reaction affecting nasal passages'
    }
  ];

  const categories = ['all', 'Respiratory', 'Cardiovascular', 'Endocrine', 'Neurological', 'Gastrointestinal', 'Mental Health'];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredData = diagnosisData.filter(item => {
    const matchesSearch = item.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = [
    { label: 'Total Conditions', value: diagnosisData.length.toString(), icon: Brain },
    { label: 'Avg Accuracy', value: `${Math.round(diagnosisData.reduce((acc, item) => acc + item.accuracy, 0) / diagnosisData.length)}%`, icon: TrendingUp },
    { label: 'High Risk Cases', value: diagnosisData.filter(item => item.severity === 'high').length.toString(), icon: AlertTriangle },
    { label: 'Categories', value: (categories.length - 1).toString(), icon: Users }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">Smart Diagnosis Center</CardTitle>
                <p className="text-purple-100">AI-powered disease identification and analysis</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <IconComponent className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conditions or symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diagnosis List */}
      <div className="grid gap-4">
        {filteredData.map((diagnosis) => (
          <Card key={diagnosis.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-semibold">{diagnosis.condition}</h3>
                  <Badge variant="outline">{diagnosis.category}</Badge>
                  <Badge className={getSeverityColor(diagnosis.severity)}>
                    {diagnosis.severity} severity
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{diagnosis.accuracy}%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{diagnosis.description}</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Common Symptoms</h4>
                  <div className="flex flex-wrap gap-1">
                    {diagnosis.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Risk Factors</h4>
                  <div className="flex flex-wrap gap-1">
                    {diagnosis.riskFactors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Prevalence</h4>
                  <p className="text-sm text-gray-600">{diagnosis.prevalence}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Common Age</h4>
                  <p className="text-sm text-gray-600">{diagnosis.commonAge}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredData.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No conditions found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiagnosisCenter;
