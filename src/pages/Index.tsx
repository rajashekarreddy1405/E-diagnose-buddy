import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Stethoscope, FileText, TrendingUp, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SymptomChecker from "@/components/SymptomChecker";
import PatientDashboard from "@/components/PatientDashboard";
import DiagnosisCenter from "@/components/DiagnosisCenter";
import TreatmentCenter from "@/components/TreatmentCenter";
import HealthAnalytics from "@/components/HealthAnalytics";
import SecurityCenter from "@/components/SecurityCenter";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  const features = [
    {
      icon: Stethoscope,
      title: "AI Symptom Checker",
      description: "Advanced diagnostic system using machine learning to analyze symptoms and suggest potential conditions",
      color: "bg-blue-500",
      action: () => setActiveTab('symptom-checker')
    },
    {
      icon: FileText,
      title: "Patient Records",
      description: "Secure digital health records with complete medical history and treatment tracking",
      color: "bg-green-500",
      action: () => setActiveTab('patient-dashboard')
    },
    {
      icon: Brain,
      title: "Smart Diagnosis",
      description: "Intelligent disease identification system that learns from user feedback and medical data",
      color: "bg-purple-500",
      action: () => setActiveTab('diagnosis')
    },
    {
      icon: Heart,
      title: "Treatment Advisor",
      description: "Evidence-based treatment recommendations with OTC medicine suggestions",
      color: "bg-red-500",
      action: () => setActiveTab('treatment')
    },
    {
      icon: TrendingUp,
      title: "Health Analytics",
      description: "Track health trends and get insights from your medical history and symptoms",
      color: "bg-orange-500",
      action: () => setActiveTab('analytics')
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "HIPAA-compliant data protection with end-to-end encryption for all medical records",
      color: "bg-teal-500",
      action: () => setActiveTab('security')
    }
  ];

  const stats = [
    { label: "Diseases in Database", value: "2,847", color: "text-blue-600" },
    { label: "Successful Diagnoses", value: "156,321", color: "text-green-600" },
    { label: "Patient Records", value: "45,892", color: "text-purple-600" },
    { label: "Accuracy Rate", value: "94.8%", color: "text-orange-600" }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'symptom-checker':
        return <SymptomChecker />;
      case 'patient-dashboard':
        return <PatientDashboard />;
      case 'diagnosis':
        return <DiagnosisCenter />;
      case 'treatment':
        return <TreatmentCenter />;
      case 'analytics':
        return <HealthAnalytics />;
      case 'security':
        return <SecurityCenter />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-2xl p-8 md:p-12">
              <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Healthcare Advisor
                </h1>
                <p className="text-xl md:text-2xl mb-6 text-blue-100">
                  AI-Powered Medical Diagnosis & Patient Management System
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    AI-Powered Diagnosis
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Machine Learning
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    HIPAA Compliant
                  </Badge>
                </div>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-700 hover:bg-blue-50"
                  onClick={() => setActiveTab('symptom-checker')}
                >
                  Start Symptom Check
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={feature.action}>
                    <CardHeader>
                      <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            {/* Medical Disclaimer */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-orange-800 mb-2">Medical Disclaimer</h3>
                    <p className="text-orange-700 text-sm leading-relaxed">
                      This system is designed to provide health information and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">HealthAdvisor</span>
              </div>
              <div className="hidden md:flex space-x-6">
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setActiveTab('home')}
                >
                  Dashboard
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'symptom-checker' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setActiveTab('symptom-checker')}
                >
                  Symptom Checker
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'patient-dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setActiveTab('patient-dashboard')}
                >
                  Patient Records
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'diagnosis' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setActiveTab('diagnosis')}
                >
                  Diagnosis
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'treatment' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setActiveTab('treatment')}
                >
                  Treatment
                </button>
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'analytics' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  onClick={() => setActiveTab('analytics')}
                >
                  Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default Index;
