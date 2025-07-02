
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Pill, 
  Heart, 
  Clock, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Home,
  Stethoscope
} from "lucide-react";

interface Diagnosis {
  condition: string;
  probability: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
  category: string;
  symptoms: string[];
  recommendations: string[];
}

interface Medicine {
  name: string;
  type: 'OTC' | 'Prescription';
  dosage: string;
  frequency: string;
  duration: string;
  warnings: string[];
  category: string;
}

interface TreatmentRecommendationsProps {
  diagnoses: Diagnosis[];
}

const TreatmentRecommendations = ({ diagnoses }: TreatmentRecommendationsProps) => {
  // Generate treatment recommendations based on top diagnosis
  const primaryDiagnosis = diagnoses[0];

  const getOTCMedicines = (condition: string): Medicine[] => {
    const medicines: { [key: string]: Medicine[] } = {
      'Common Cold or Flu': [
        {
          name: 'Acetaminophen (Tylenol)',
          type: 'OTC',
          dosage: '500-1000mg',
          frequency: 'Every 6-8 hours',
          duration: '3-5 days',
          warnings: ['Do not exceed 4000mg per day', 'Avoid alcohol'],
          category: 'Pain Relief'
        },
        {
          name: 'Ibuprofen (Advil, Motrin)',
          type: 'OTC',
          dosage: '200-400mg',
          frequency: 'Every 6 hours',
          duration: '3-5 days',
          warnings: ['Take with food', 'Avoid if allergic to NSAIDs'],
          category: 'Anti-inflammatory'
        },
        {
          name: 'Dextromethorphan (Robitussin DM)',
          type: 'OTC',
          dosage: '15-30mg',
          frequency: 'Every 4 hours',
          duration: '7 days max',
          warnings: ['Do not exceed recommended dose', 'May cause drowsiness'],
          category: 'Cough Suppressant'
        }
      ],
      'Gastroenteritis (Stomach Bug)': [
        {
          name: 'Loperamide (Imodium)',
          type: 'OTC',
          dosage: '2mg',
          frequency: 'After each loose stool',
          duration: '2 days max',
          warnings: ['Do not use if fever present', 'Maximum 8mg per day'],
          category: 'Anti-diarrheal'
        },
        {
          name: 'Oral Rehydration Solution',
          type: 'OTC',
          dosage: '200-400ml',
          frequency: 'After each episode',
          duration: 'Until symptoms resolve',
          warnings: ['Follow package instructions'],
          category: 'Rehydration'
        }
      ],
      'Tension Headache': [
        {
          name: 'Acetaminophen (Tylenol)',
          type: 'OTC',
          dosage: '500-1000mg',
          frequency: 'Every 6 hours',
          duration: '3 days max',
          warnings: ['Do not exceed daily limit'],
          category: 'Pain Relief'
        },
        {
          name: 'Aspirin',
          type: 'OTC',
          dosage: '325-650mg',
          frequency: 'Every 4 hours',
          duration: '3 days max',
          warnings: ['Take with food', 'Avoid if under 18'],
          category: 'Pain Relief'
        }
      ],
      'Allergic Reaction': [
        {
          name: 'Loratadine (Claritin)',
          type: 'OTC',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: 'As needed',
          warnings: ['May cause mild drowsiness'],
          category: 'Antihistamine'
        },
        {
          name: 'Diphenhydramine (Benadryl)',
          type: 'OTC',
          dosage: '25-50mg',
          frequency: 'Every 6 hours',
          duration: 'As needed',
          warnings: ['Causes drowsiness', 'Do not drive'],
          category: 'Antihistamine'
        }
      ]
    };

    return medicines[condition] || [];
  };

  const getHomeRemedies = (condition: string): string[] => {
    const remedies: { [key: string]: string[] } = {
      'Common Cold or Flu': [
        'Drink plenty of warm fluids like tea with honey',
        'Gargle with warm salt water for sore throat',
        'Use a humidifier or breathe steam from hot shower',
        'Get adequate rest (7-9 hours of sleep)',
        'Eat chicken soup for hydration and comfort'
      ],
      'Gastroenteritis (Stomach Bug)': [
        'Follow BRAT diet (Bananas, Rice, Applesauce, Toast)',
        'Drink clear fluids in small, frequent sips',
        'Avoid dairy, caffeine, alcohol, and fatty foods',
        'Rest and avoid solid foods until vomiting stops',
        'Try ginger tea for nausea relief'
      ],
      'Tension Headache': [
        'Apply cold or warm compress to head/neck',
        'Practice relaxation techniques and deep breathing',
        'Massage temples and neck muscles gently',
        'Stay hydrated and maintain regular sleep schedule',
        'Reduce screen time and take breaks from work'
      ],
      'Allergic Reaction': [
        'Identify and avoid known allergens',
        'Use saline nasal rinse to clear allergens',
        'Keep windows closed during high pollen days',
        'Shower after being outdoors',
        'Use HEPA air filters in your home'
      ]
    };

    return remedies[condition] || [
      'Stay hydrated with plenty of water',
      'Get adequate rest and sleep',
      'Eat nutritious, easily digestible foods',
      'Monitor symptoms and track changes'
    ];
  };

  const otcMedicines = getOTCMedicines(primaryDiagnosis?.condition || '');
  const homeRemedies = getHomeRemedies(primaryDiagnosis?.condition || '');

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Pill className="w-8 h-8" />
            <div>
              <CardTitle className="text-2xl">Treatment Recommendations</CardTitle>
              <p className="text-green-100">Evidence-based care suggestions for your condition</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* OTC Medications */}
      {otcMedicines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Pill className="w-6 h-6 text-blue-600" />
              <span>Over-the-Counter Medications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {otcMedicines.map((medicine, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{medicine.name}</h3>
                  <Badge variant="outline">{medicine.category}</Badge>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Dosage:</span>
                    <p>{medicine.dosage}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Frequency:</span>
                    <p>{medicine.frequency}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Duration:</span>
                    <p>{medicine.duration}</p>
                  </div>
                </div>

                {medicine.warnings.length > 0 && (
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-700">
                      <strong>Important Warnings:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {medicine.warnings.map((warning, idx) => (
                          <li key={idx}>{warning}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Home Remedies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="w-6 h-6 text-green-600" />
            <span>Home Care & Natural Remedies</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {homeRemedies.map((remedy, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{remedy}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* When to See a Doctor */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-700">
            <Stethoscope className="w-6 h-6" />
            <span>When to Seek Medical Care</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-700">Seek immediate care if:</p>
                <ul className="list-disc list-inside text-red-600 mt-1 space-y-1">
                  <li>Symptoms worsen significantly or suddenly</li>
                  <li>High fever (above 103°F/39.4°C)</li>
                  <li>Difficulty breathing or chest pain</li>
                  <li>Severe dehydration or inability to keep fluids down</li>
                  <li>Signs of serious allergic reaction (swelling, rash, difficulty breathing)</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Heart className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-orange-700">Schedule appointment if:</p>
                <ul className="list-disc list-inside text-orange-600 mt-1 space-y-1">
                  <li>Symptoms persist longer than expected</li>
                  <li>No improvement after 3-5 days of treatment</li>
                  <li>Recurring symptoms or chronic issues</li>
                  <li>Need prescription medication or specialized care</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Disclaimer */}
      <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700">
          <strong>Safety Notice:</strong> These recommendations are general guidelines based on common treatment protocols. Individual responses to medications may vary. Always read medication labels, follow dosing instructions, and consult with a pharmacist or healthcare provider if you have questions about drug interactions or allergies.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default TreatmentRecommendations;
