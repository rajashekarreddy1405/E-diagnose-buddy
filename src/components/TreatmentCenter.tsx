
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, Search, Pill, Clock, AlertTriangle, CheckCircle } from "lucide-react";

interface Treatment {
  id: string;
  condition: string;
  category: string;
  medications: Medication[];
  homeRemedies: string[];
  lifestyle: string[];
  duration: string;
  effectiveness: number;
  sideEffects: string[];
  precautions: string[];
}

interface Medication {
  name: string;
  type: 'OTC' | 'Prescription';
  dosage: string;
  frequency: string;
  price: string;
}

const TreatmentCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const treatmentData: Treatment[] = [
    {
      id: '1',
      condition: 'Common Cold',
      category: 'Respiratory',
      medications: [
        { name: 'Acetaminophen', type: 'OTC', dosage: '500mg', frequency: 'Every 6 hours', price: '$5-8' },
        { name: 'Dextromethorphan', type: 'OTC', dosage: '15mg', frequency: 'Every 4 hours', price: '$8-12' },
        { name: 'Phenylephrine', type: 'OTC', dosage: '10mg', frequency: 'Every 4 hours', price: '$6-10' }
      ],
      homeRemedies: ['Warm salt water gargle', 'Honey and ginger tea', 'Steam inhalation', 'Adequate rest'],
      lifestyle: ['Increase fluid intake', 'Get plenty of sleep', 'Avoid smoking', 'Use humidifier'],
      duration: '7-10 days',
      effectiveness: 85,
      sideEffects: ['Drowsiness', 'Dry mouth', 'Nausea'],
      precautions: ['Do not exceed recommended dose', 'Avoid alcohol', 'Consult if symptoms worsen']
    },
    {
      id: '2',
      condition: 'Hypertension',
      category: 'Cardiovascular',
      medications: [
        { name: 'Lisinopril', type: 'Prescription', dosage: '10mg', frequency: 'Once daily', price: '$15-25' },
        { name: 'Amlodipine', type: 'Prescription', dosage: '5mg', frequency: 'Once daily', price: '$10-20' },
        { name: 'Aspirin', type: 'OTC', dosage: '81mg', frequency: 'Once daily', price: '$3-6' }
      ],
      homeRemedies: ['Regular exercise', 'Meditation', 'Deep breathing', 'Limit sodium'],
      lifestyle: ['DASH diet', 'Weight management', 'Limit alcohol', 'Quit smoking'],
      duration: 'Lifelong management',
      effectiveness: 90,
      sideEffects: ['Dizziness', 'Fatigue', 'Cough'],
      precautions: ['Monitor blood pressure regularly', 'Check kidney function', 'Watch for drug interactions']
    },
    {
      id: '3',
      condition: 'Type 2 Diabetes',
      category: 'Endocrine',
      medications: [
        { name: 'Metformin', type: 'Prescription', dosage: '500mg', frequency: 'Twice daily', price: '$20-30' },
        { name: 'Glipizide', type: 'Prescription', dosage: '5mg', frequency: 'Once daily', price: '$25-35' },
        { name: 'Insulin', type: 'Prescription', dosage: 'Variable', frequency: 'As needed', price: '$50-100' }
      ],
      homeRemedies: ['Cinnamon tea', 'Apple cider vinegar', 'Regular exercise', 'Stress management'],
      lifestyle: ['Low carb diet', 'Regular meal timing', 'Weight loss', 'Blood sugar monitoring'],
      duration: 'Lifelong management',
      effectiveness: 88,
      sideEffects: ['Nausea', 'Hypoglycemia', 'Weight gain'],
      precautions: ['Monitor blood sugar', 'Regular eye exams', 'Foot care', 'Kidney function tests']
    },
    {
      id: '4',
      condition: 'Migraine',
      category: 'Neurological',
      medications: [
        { name: 'Ibuprofen', type: 'OTC', dosage: '400mg', frequency: 'Every 6 hours', price: '$5-10' },
        { name: 'Sumatriptan', type: 'Prescription', dosage: '50mg', frequency: 'As needed', price: '$40-60' },
        { name: 'Acetaminophen', type: 'OTC', dosage: '1000mg', frequency: 'Every 6 hours', price: '$5-8' }
      ],
      homeRemedies: ['Cold compress', 'Dark quiet room', 'Peppermint oil', 'Hydration'],
      lifestyle: ['Identify triggers', 'Regular sleep', 'Stress management', 'Regular meals'],
      duration: '4-72 hours per episode',
      effectiveness: 80,
      sideEffects: ['Drowsiness', 'Nausea', 'Dizziness'],
      precautions: ['Avoid overuse', 'Track triggers', 'Gradual dose reduction']
    },
    {
      id: '5',
      condition: 'Gastroenteritis',
      category: 'Gastrointestinal',
      medications: [
        { name: 'Loperamide', type: 'OTC', dosage: '2mg', frequency: 'After each loose stool', price: '$8-12' },
        { name: 'Ondansetron', type: 'Prescription', dosage: '4mg', frequency: 'Every 8 hours', price: '$30-45' },
        { name: 'Oral rehydration salts', type: 'OTC', dosage: '1 packet', frequency: 'Every 2 hours', price: '$5-8' }
      ],
      homeRemedies: ['BRAT diet', 'Clear fluids', 'Ginger tea', 'Rest'],
      lifestyle: ['Gradual food reintroduction', 'Hand hygiene', 'Food safety', 'Hydration'],
      duration: '3-7 days',
      effectiveness: 85,
      sideEffects: ['Constipation', 'Drowsiness', 'Dry mouth'],
      precautions: ['Monitor dehydration', 'Avoid dairy initially', 'Seek help if severe']
    },
    {
      id: '6',
      condition: 'Anxiety Disorder',
      category: 'Mental Health',
      medications: [
        { name: 'Sertraline', type: 'Prescription', dosage: '50mg', frequency: 'Once daily', price: '$25-40' },
        { name: 'Lorazepam', type: 'Prescription', dosage: '0.5mg', frequency: 'As needed', price: '$15-25' },
        { name: 'L-theanine', type: 'OTC', dosage: '200mg', frequency: 'Twice daily', price: '$15-20' }
      ],
      homeRemedies: ['Deep breathing', 'Meditation', 'Chamomile tea', 'Regular exercise'],
      lifestyle: ['Therapy', 'Sleep hygiene', 'Limit caffeine', 'Social support'],
      duration: 'Variable, often long-term',
      effectiveness: 75,
      sideEffects: ['Drowsiness', 'Nausea', 'Sexual dysfunction'],
      precautions: ['Gradual dose changes', 'Monitor mood', 'Avoid alcohol', 'Regular follow-up']
    }
  ];

  const categories = ['all', 'Respiratory', 'Cardiovascular', 'Endocrine', 'Neurological', 'Gastrointestinal', 'Mental Health'];

  const filteredData = treatmentData.filter(treatment => {
    const matchesSearch = treatment.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.medications.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || treatment.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = [
    { label: 'Treatment Plans', value: treatmentData.length.toString(), icon: Heart },
    { label: 'OTC Medications', value: treatmentData.reduce((acc, t) => acc + t.medications.filter(m => m.type === 'OTC').length, 0).toString(), icon: Pill },
    { label: 'Avg Effectiveness', value: `${Math.round(treatmentData.reduce((acc, item) => acc + item.effectiveness, 0) / treatmentData.length)}%`, icon: CheckCircle },
    { label: 'Home Remedies', value: treatmentData.reduce((acc, t) => acc + t.homeRemedies.length, 0).toString(), icon: Clock }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">Treatment Center</CardTitle>
                <p className="text-red-100">Evidence-based treatment recommendations and medication guidance</p>
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
                <IconComponent className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">{stat.value}</div>
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
                placeholder="Search treatments or medications..."
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

      {/* Treatment List */}
      <div className="grid gap-6">
        {filteredData.map((treatment) => (
          <Card key={treatment.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-semibold">{treatment.condition}</h3>
                  <Badge variant="outline">{treatment.category}</Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600">{treatment.effectiveness}%</div>
                  <div className="text-sm text-gray-600">Effectiveness</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Medications */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Pill className="w-4 h-4 mr-2" />
                    Medications
                  </h4>
                  <div className="space-y-3">
                    {treatment.medications.map((med, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{med.name}</span>
                          <Badge variant={med.type === 'OTC' ? 'secondary' : 'default'}>
                            {med.type}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Dosage: {med.dosage}</div>
                          <div>Frequency: {med.frequency}</div>
                          <div>Price: {med.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Home Remedies & Lifestyle */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Home Remedies</h4>
                    <div className="flex flex-wrap gap-1">
                      {treatment.homeRemedies.map((remedy, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {remedy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Lifestyle Changes</h4>
                    <div className="flex flex-wrap gap-1">
                      {treatment.lifestyle.map((change, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {change}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Duration</h4>
                    <p className="text-sm text-gray-600">{treatment.duration}</p>
                  </div>
                </div>
              </div>

              {/* Precautions & Side Effects */}
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Precautions
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {treatment.precautions.map((precaution, index) => (
                      <li key={index}>• {precaution}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <h4 className="font-medium text-red-800 mb-2">Common Side Effects</h4>
                  <div className="flex flex-wrap gap-1">
                    {treatment.sideEffects.map((effect, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {effect}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredData.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No treatments found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TreatmentCenter;
