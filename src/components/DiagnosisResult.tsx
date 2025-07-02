
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  Pill, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Star,
  Heart,
  Activity,
  Clock,
  Target
} from "lucide-react";
import TreatmentRecommendations from "./TreatmentRecommendations";

interface Answer {
  symptomId: string;
  value: string | string[] | number;
}

interface Diagnosis {
  condition: string;
  probability: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
  category: string;
  symptoms: string[];
  recommendations: string[];
}

interface DiagnosisResultProps {
  answers: Answer[];
  onRestart: () => void;
}

const DiagnosisResult = ({ answers, onRestart }: DiagnosisResultProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ [key: string]: number }>({});

  // Simulated AI diagnosis engine
  useEffect(() => {
    const generateDiagnosis = () => {
      setIsLoading(true);
      
      // Simulate AI processing delay
      setTimeout(() => {
        const possibleDiagnoses: Diagnosis[] = [];

        // Analyze fever symptoms
        const feverAnswer = answers.find(a => a.symptomId === 'fever');
        const painAnswer = answers.find(a => a.symptomId === 'pain');
        const respiratoryAnswer = answers.find(a => a.symptomId === 'respiratory');
        const digestiveAnswer = answers.find(a => a.symptomId === 'digestive');
        const severityAnswer = answers.find(a => a.symptomId === 'severity');

        // Common Cold/Flu Logic
        if (feverAnswer?.value !== 'No fever' || 
            (respiratoryAnswer?.value as string[])?.some(s => ['Cough', 'Runny nose', 'Sore throat'].includes(s))) {
          possibleDiagnoses.push({
            condition: 'Common Cold or Flu',
            probability: 85,
            description: 'Viral upper respiratory infection commonly affecting the nose, throat, and airways.',
            severity: 'low',
            category: 'Respiratory',
            symptoms: ['Fever', 'Cough', 'Runny nose', 'Body aches'],
            recommendations: ['Rest and fluids', 'OTC pain relievers', 'Throat lozenges', 'Monitor symptoms']
          });
        }

        // Gastroenteritis Logic
        if ((digestiveAnswer?.value as string[])?.some(s => ['Nausea', 'Vomiting', 'Diarrhea'].includes(s))) {
          possibleDiagnoses.push({
            condition: 'Gastroenteritis (Stomach Bug)',
            probability: 75,
            description: 'Inflammation of the stomach and intestines, often caused by viral or bacterial infection.',
            severity: 'medium',
            category: 'Digestive',
            symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal pain'],
            recommendations: ['Stay hydrated', 'BRAT diet', 'Electrolyte replacement', 'Avoid dairy']
          });
        }

        // Tension Headache Logic
        if ((painAnswer?.value as string[])?.includes('Headache')) {
          possibleDiagnoses.push({
            condition: 'Tension Headache',
            probability: 70,
            description: 'Most common type of headache, often caused by stress, fatigue, or muscle tension.',
            severity: 'low',
            category: 'Neurological',
            symptoms: ['Headache', 'Neck tension', 'Mild sensitivity to light'],
            recommendations: ['Rest in dark room', 'OTC pain relievers', 'Hydration', 'Stress management']
          });
        }

        // Migraine Logic
        if ((painAnswer?.value as string[])?.includes('Headache') && 
            (severityAnswer?.value as number) >= 7) {
          possibleDiagnoses.push({
            condition: 'Migraine',
            probability: 60,
            description: 'Intense headache disorder that can cause severe throbbing pain, often on one side of the head.',
            severity: 'high',
            category: 'Neurological',
            symptoms: ['Severe headache', 'Nausea', 'Light sensitivity', 'Sound sensitivity'],
            recommendations: ['Dark, quiet environment', 'Cold compress', 'Prescription medication', 'Avoid triggers']
          });
        }

        // Allergic Reaction Logic
        if ((respiratoryAnswer?.value as string[])?.some(s => ['Runny nose', 'Sore throat'].includes(s)) &&
            !feverAnswer?.value.toString().includes('fever')) {
          possibleDiagnoses.push({
            condition: 'Allergic Reaction',
            probability: 65,
            description: 'Immune system response to allergens like pollen, dust, or certain foods.',
            severity: 'low',
            category: 'Immunological',
            symptoms: ['Runny nose', 'Sneezing', 'Itchy eyes', 'Congestion'],
            recommendations: ['Antihistamines', 'Avoid allergens', 'Nasal saline rinse', 'Monitor symptoms']
          });
        }

        // Default general symptoms
        if (possibleDiagnoses.length === 0) {
          possibleDiagnoses.push({
            condition: 'General Symptoms Requiring Medical Evaluation',
            probability: 50,
            description: 'Your symptoms require professional medical evaluation for accurate diagnosis.',
            severity: 'medium',
            category: 'General',
            symptoms: ['Various symptoms reported'],
            recommendations: ['Schedule medical appointment', 'Monitor symptoms', 'Keep symptom diary', 'Stay hydrated']
          });
        }

        // Sort by probability
        possibleDiagnoses.sort((a, b) => b.probability - a.probability);
        
        setDiagnoses(possibleDiagnoses.slice(0, 3)); // Show top 3 diagnoses
        setIsLoading(false);
      }, 2000);
    };

    generateDiagnosis();
  }, [answers]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleFeedback = (diagnosisCondition: string, rating: number) => {
    setFeedback(prev => ({ ...prev, [diagnosisCondition]: rating }));
    console.log(`Feedback for ${diagnosisCondition}: ${rating} stars`);
    // In a real system, this would be sent to the backend for AI learning
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="text-center p-8">
          <CardContent>
            <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold mb-4">AI Diagnosis in Progress</h2>
            <p className="text-gray-600 mb-6">Our advanced medical AI is analyzing your symptoms...</p>
            <Progress value={66} className="mb-4" />
            <div className="flex justify-center items-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm">Processing medical data</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">Diagnosis Results</CardTitle>
                <p className="text-green-100">AI-powered medical analysis complete</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{diagnoses.length}</div>
              <div className="text-sm text-green-100">Possible Conditions</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Diagnoses */}
      <div className="space-y-4">
        {diagnoses.map((diagnosis, index) => (
          <Card key={index} className={`border-l-4 ${
            index === 0 ? 'border-l-blue-500 bg-blue-50' : 'border-l-gray-300'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge variant={index === 0 ? "default" : "secondary"}>
                    #{index + 1} Most Likely
                  </Badge>
                  <CardTitle className="text-xl">{diagnosis.condition}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {diagnosis.probability}%
                    </div>
                    <div className="text-sm text-gray-500">Confidence</div>
                  </div>
                  <Progress value={diagnosis.probability} className="w-20" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{diagnosis.description}</p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Severity
                  </h4>
                  <Badge className={getSeverityColor(diagnosis.severity)}>
                    {diagnosis.severity.charAt(0).toUpperCase() + diagnosis.severity.slice(1)}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Category
                  </h4>
                  <Badge variant="outline">{diagnosis.category}</Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Matching Symptoms
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {diagnosis.symptoms.slice(0, 3).map((symptom, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feedback Section */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">How helpful is this diagnosis?</h4>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback(diagnosis.condition, star)}
                      className="p-1"
                    >
                      <Star 
                        className={`w-5 h-5 ${
                          (feedback[diagnosis.condition] || 0) >= star 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    </Button>
                  ))}
                  {feedback[diagnosis.condition] && (
                    <span className="text-sm text-gray-600 ml-2">
                      Thank you for your feedback!
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Treatment Recommendations */}
      <TreatmentRecommendations diagnoses={diagnoses} />

      {/* Important Notices */}
      <div className="space-y-4">
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-700">
            <strong>Medical Disclaimer:</strong> This AI diagnosis is for informational purposes only and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.
          </AlertDescription>
        </Alert>

        <Alert className="border-red-200 bg-red-50">
          <Heart className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            <strong>When to Seek Immediate Care:</strong> If you experience severe symptoms like difficulty breathing, chest pain, severe abdominal pain, or loss of consciousness, seek emergency medical attention immediately.
          </AlertDescription>
        </Alert>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button onClick={onRestart} variant="outline" size="lg">
          <RefreshCw className="w-4 h-4 mr-2" />
          Start New Assessment
        </Button>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Clock className="w-4 h-4 mr-2" />
          Schedule Appointment
        </Button>
      </div>
    </div>
  );
};

export default DiagnosisResult;
