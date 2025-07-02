
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Stethoscope, Pill, ArrowRight, ArrowLeft } from "lucide-react";
import DiagnosisResult from "./DiagnosisResult";

interface Symptom {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'scale';
  options?: string[];
  category: string;
}

interface Answer {
  symptomId: string;
  value: string | string[] | number;
}

const SymptomChecker = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const symptoms: Symptom[] = [
    {
      id: 'fever',
      question: 'Are you experiencing fever?',
      type: 'single',
      options: ['Yes, high fever (>101°F)', 'Yes, mild fever (99-101°F)', 'No fever'],
      category: 'general'
    },
    {
      id: 'pain',
      question: 'What type of pain are you experiencing?',
      type: 'multiple',
      options: ['Headache', 'Body aches', 'Chest pain', 'Abdominal pain', 'Joint pain', 'No pain'],
      category: 'pain'
    },
    {
      id: 'respiratory',
      question: 'Do you have any respiratory symptoms?',
      type: 'multiple',
      options: ['Cough', 'Shortness of breath', 'Sore throat', 'Runny nose', 'None'],
      category: 'respiratory'
    },
    {
      id: 'severity',
      question: 'How severe are your symptoms overall? (1 = mild, 10 = severe)',
      type: 'scale',
      category: 'assessment'
    },
    {
      id: 'duration',
      question: 'How long have you been experiencing these symptoms?',
      type: 'single',
      options: ['Less than 24 hours', '1-3 days', '4-7 days', 'More than a week'],
      category: 'timeline'
    },
    {
      id: 'digestive',
      question: 'Are you experiencing any digestive issues?',
      type: 'multiple',
      options: ['Nausea', 'Vomiting', 'Diarrhea', 'Loss of appetite', 'None'],
      category: 'digestive'
    }
  ];

  const progress = ((currentStep + 1) / symptoms.length) * 100;

  const handleAnswer = (value: string | string[] | number) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.symptomId === symptoms[currentStep].id);
    
    if (existingIndex >= 0) {
      newAnswers[existingIndex].value = value;
    } else {
      newAnswers.push({
        symptomId: symptoms[currentStep].id,
        value: value
      });
    }
    
    setAnswers(newAnswers);
  };

  const nextStep = () => {
    if (currentStep < symptoms.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.symptomId === symptoms[currentStep].id)?.value;
  };

  const isAnswered = () => {
    const currentAnswer = getCurrentAnswer();
    return currentAnswer !== undefined && currentAnswer !== null;
  };

  if (showResults) {
    return <DiagnosisResult answers={answers} onRestart={() => {
      setCurrentStep(0);
      setAnswers([]);
      setShowResults(false);
    }} />;
  }

  const currentSymptom = symptoms[currentStep];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Stethoscope className="w-8 h-8" />
            <div>
              <CardTitle className="text-2xl">AI Symptom Checker</CardTitle>
              <p className="text-blue-100">Answer a few questions to get personalized health insights</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Question {currentStep + 1} of {symptoms.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="min-h-[400px]">
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-2">
            <Badge variant="outline" className="mr-2">
              {currentSymptom.category}
            </Badge>
            {currentSymptom.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentSymptom.type === 'single' && (
            <div className="space-y-3">
              {currentSymptom.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={getCurrentAnswer() === option ? "default" : "outline"}
                  className="w-full text-left justify-start h-auto p-4"
                  onClick={() => handleAnswer(option)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      getCurrentAnswer() === option 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-gray-300'
                    }`}>
                      {getCurrentAnswer() === option && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </Button>
              ))}
            </div>
          )}

          {currentSymptom.type === 'multiple' && (
            <div className="space-y-3">
              {currentSymptom.options?.map((option, index) => {
                const currentAnswers = (getCurrentAnswer() as string[]) || [];
                const isSelected = currentAnswers.includes(option);
                
                return (
                  <Button
                    key={index}
                    variant={isSelected ? "default" : "outline"}
                    className="w-full text-left justify-start h-auto p-4"
                    onClick={() => {
                      const current = (getCurrentAnswer() as string[]) || [];
                      let newAnswer;
                      if (isSelected) {
                        newAnswer = current.filter(item => item !== option);
                      } else {
                        newAnswer = [...current, option];
                      }
                      handleAnswer(newAnswer);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded border-2 ${
                        isSelected 
                          ? 'bg-blue-600 border-blue-600' 
                          : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </Button>
                );
              })}
            </div>
          )}

          {currentSymptom.type === 'scale' && (
            <div className="space-y-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Mild (1)</span>
                <span>Moderate (5)</span>
                <span>Severe (10)</span>
              </div>
              <div className="grid grid-cols-10 gap-2">
                {[...Array(10)].map((_, index) => {
                  const value = index + 1;
                  const isSelected = getCurrentAnswer() === value;
                  return (
                    <Button
                      key={value}
                      variant={isSelected ? "default" : "outline"}
                      className="aspect-square p-0"
                      onClick={() => handleAnswer(value)}
                    >
                      {value}
                    </Button>
                  );
                })}
              </div>
              <div className="text-center">
                <span className="text-lg font-semibold">
                  Selected: {getCurrentAnswer() || 'None'}
                </span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
            
            <Button
              onClick={nextStep}
              disabled={!isAnswered()}
              className="flex items-center space-x-2"
            >
              <span>{currentStep === symptoms.length - 1 ? 'Get Diagnosis' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Safety Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 text-orange-700">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm">
              <strong>Emergency Notice:</strong> If you're experiencing severe symptoms like difficulty breathing, chest pain, or loss of consciousness, please seek immediate medical attention or call emergency services.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SymptomChecker;
