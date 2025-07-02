
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  User, 
  Calendar, 
  FileText, 
  Activity, 
  TrendingUp, 
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2
} from "lucide-react";

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  blood_type: string;
  allergies: string[];
  chronic_conditions: string[];
  emergency_contact_name: string;
  emergency_contact_phone: string;
  created_at: string;
  updated_at: string;
}

interface MedicalRecord {
  id: string;
  patient_id: string;
  visit_date: string;
  condition_name: string;
  diagnosis: string;
  symptoms: string[];
  treatment: string;
  medications: string[];
  notes: string;
  status: 'active' | 'resolved' | 'chronic';
  severity: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

interface Appointment {
  id: string;
  patient_id: string;
  appointment_date: string;
  appointment_time: string;
  duration: number;
  purpose: string;
  doctor_name: string;
  department: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  notes: string;
  created_at: string;
  updated_at: string;
}

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [patientForm, setPatientForm] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    blood_type: '',
    allergies: '',
    chronic_conditions: '',
    emergency_contact_name: '',
    emergency_contact_phone: ''
  });

  const [appointmentForm, setAppointmentForm] = useState({
    patient_id: '',
    appointment_date: '',
    appointment_time: '',
    duration: 30,
    purpose: '',
    doctor_name: '',
    department: '',
    notes: ''
  });

  useEffect(() => {
    fetchPatients();
    fetchMedicalRecords();
    fetchAppointments();
  }, []);

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPatients(data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast.error('Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicalRecords = async () => {
    try {
      const { data, error } = await supabase
        .from('medical_records')
        .select('*')
        .order('visit_date', { ascending: false });
      
      if (error) throw error;
      setMedicalRecords(data || []);
    } catch (error) {
      console.error('Error fetching medical records:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true });
      
      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const patientData = {
        ...patientForm,
        allergies: patientForm.allergies ? patientForm.allergies.split(',').map(s => s.trim()) : [],
        chronic_conditions: patientForm.chronic_conditions ? patientForm.chronic_conditions.split(',').map(s => s.trim()) : []
      };

      const { data, error } = await supabase
        .from('patients')
        .insert([patientData])
        .select();

      if (error) throw error;
      
      toast.success('Patient added successfully');
      setIsAddPatientOpen(false);
      setPatientForm({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        blood_type: '',
        allergies: '',
        chronic_conditions: '',
        emergency_contact_name: '',
        emergency_contact_phone: ''
      });
      fetchPatients();
    } catch (error) {
      console.error('Error adding patient:', error);
      toast.error('Failed to add patient');
    }
  };

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentForm])
        .select();

      if (error) throw error;
      
      toast.success('Appointment scheduled successfully');
      setIsAddAppointmentOpen(false);
      setAppointmentForm({
        patient_id: '',
        appointment_date: '',
        appointment_time: '',
        duration: 30,
        purpose: '',
        doctor_name: '',
        department: '',
        notes: ''
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error adding appointment:', error);
      toast.error('Failed to schedule appointment');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'chronic': return 'bg-orange-100 text-orange-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredPatients = patients.filter(patient =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderPatientList = () => (
    <div className="space-y-6">
      {/* Search and Add Patient */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Patient
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Patient</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddPatient} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                          id="first_name"
                          value={patientForm.first_name}
                          onChange={(e) => setPatientForm({...patientForm, first_name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                          id="last_name"
                          value={patientForm.last_name}
                          onChange={(e) => setPatientForm({...patientForm, last_name: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date_of_birth">Date of Birth</Label>
                        <Input
                          id="date_of_birth"
                          type="date"
                          value={patientForm.date_of_birth}
                          onChange={(e) => setPatientForm({...patientForm, date_of_birth: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={patientForm.gender} onValueChange={(value) => setPatientForm({...patientForm, gender: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={patientForm.phone}
                          onChange={(e) => setPatientForm({...patientForm, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={patientForm.email}
                          onChange={(e) => setPatientForm({...patientForm, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={patientForm.address}
                        onChange={(e) => setPatientForm({...patientForm, address: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="blood_type">Blood Type</Label>
                      <Input
                        id="blood_type"
                        value={patientForm.blood_type}
                        onChange={(e) => setPatientForm({...patientForm, blood_type: e.target.value})}
                        placeholder="e.g., O+, A-, B+, AB-"
                      />
                    </div>
                    <div>
                      <Label htmlFor="allergies">Allergies (comma-separated)</Label>
                      <Input
                        id="allergies"
                        value={patientForm.allergies}
                        onChange={(e) => setPatientForm({...patientForm, allergies: e.target.value})}
                        placeholder="e.g., Penicillin, Shellfish, Peanuts"
                      />
                    </div>
                    <div>
                      <Label htmlFor="chronic_conditions">Chronic Conditions (comma-separated)</Label>
                      <Input
                        id="chronic_conditions"
                        value={patientForm.chronic_conditions}
                        onChange={(e) => setPatientForm({...patientForm, chronic_conditions: e.target.value})}
                        placeholder="e.g., Hypertension, Diabetes"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
                        <Input
                          id="emergency_contact_name"
                          value={patientForm.emergency_contact_name}
                          onChange={(e) => setPatientForm({...patientForm, emergency_contact_name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
                        <Input
                          id="emergency_contact_phone"
                          value={patientForm.emergency_contact_phone}
                          onChange={(e) => setPatientForm({...patientForm, emergency_contact_phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsAddPatientOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Patient</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <div className="space-y-4">
        {loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">Loading patients...</div>
            </CardContent>
          </Card>
        ) : filteredPatients.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Patients Found</h3>
              <p className="text-gray-600 mb-4">Start by adding your first patient to the system.</p>
              <Button onClick={() => setIsAddPatientOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Patient
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredPatients.map((patient) => (
            <Card key={patient.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedPatient(patient)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="text-xl font-semibold">{patient.first_name} {patient.last_name}</h3>
                      <p className="text-gray-600">
                        {patient.gender} • Age: {new Date().getFullYear() - new Date(patient.date_of_birth).getFullYear()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Blood Type</div>
                    <div className="font-semibold">{patient.blood_type}</div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Contact</div>
                    <div className="text-sm">{patient.phone}</div>
                    <div className="text-sm">{patient.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Emergency Contact</div>
                    <div className="text-sm">{patient.emergency_contact_name}</div>
                    <div className="text-sm">{patient.emergency_contact_phone}</div>
                  </div>
                </div>

                {(patient.allergies?.length > 0 || patient.chronic_conditions?.length > 0) && (
                  <div className="mt-4 pt-4 border-t">
                    {patient.allergies?.length > 0 && (
                      <div className="mb-2">
                        <div className="text-sm text-gray-600 mb-1">Allergies</div>
                        <div className="flex flex-wrap gap-1">
                          {patient.allergies.map((allergy, index) => (
                            <Badge key={index} variant="destructive" className="text-xs">{allergy}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {patient.chronic_conditions?.length > 0 && (
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Chronic Conditions</div>
                        <div className="flex flex-wrap gap-1">
                          {patient.chronic_conditions.map((condition, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">{condition}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      {/* Add Appointment */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Appointments</h3>
            <Dialog open={isAddAppointmentOpen} onOpenChange={setIsAddAppointmentOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Schedule New Appointment</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddAppointment} className="space-y-4">
                  <div>
                    <Label htmlFor="patient_select">Patient</Label>
                    <Select value={appointmentForm.patient_id} onValueChange={(value) => setAppointmentForm({...appointmentForm, patient_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.first_name} {patient.last_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="appointment_date">Date</Label>
                      <Input
                        id="appointment_date"
                        type="date"
                        value={appointmentForm.appointment_date}
                        onChange={(e) => setAppointmentForm({...appointmentForm, appointment_date: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="appointment_time">Time</Label>
                      <Input
                        id="appointment_time"
                        type="time"
                        value={appointmentForm.appointment_time}
                        onChange={(e) => setAppointmentForm({...appointmentForm, appointment_time: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input
                      id="purpose"
                      value={appointmentForm.purpose}
                      onChange={(e) => setAppointmentForm({...appointmentForm, purpose: e.target.value})}
                      placeholder="e.g., Regular checkup, Follow-up"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="doctor_name">Doctor Name</Label>
                    <Input
                      id="doctor_name"
                      value={appointmentForm.doctor_name}
                      onChange={(e) => setAppointmentForm({...appointmentForm, doctor_name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={appointmentForm.department}
                      onChange={(e) => setAppointmentForm({...appointmentForm, department: e.target.value})}
                      placeholder="e.g., Cardiology, General Medicine"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={appointmentForm.duration}
                      onChange={(e) => setAppointmentForm({...appointmentForm, duration: parseInt(e.target.value)})}
                      min="15"
                      max="180"
                    />
                  </div>
                  <div>
                    <Label htmlFor="appointment_notes">Notes</Label>
                    <Textarea
                      id="appointment_notes"
                      value={appointmentForm.notes}
                      onChange={(e) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
                      placeholder="Additional notes..."
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddAppointmentOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Schedule</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Appointments Scheduled</h3>
              <p className="text-gray-600">Schedule your first appointment.</p>
            </CardContent>
          </Card>
        ) : (
          appointments.map((appointment) => {
            const patient = patients.find(p => p.id === appointment.patient_id);
            return (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-6 h-6 text-blue-600" />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown Patient'}
                        </h3>
                        <p className="text-gray-600">{appointment.purpose}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Date & Time</div>
                      <div className="font-semibold">
                        {new Date(appointment.appointment_date).toLocaleDateString()}
                      </div>
                      <div className="text-sm">{appointment.appointment_time}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Doctor</div>
                      <div className="font-semibold">{appointment.doctor_name || 'TBD'}</div>
                      <div className="text-sm">{appointment.department}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Duration</div>
                      <div className="font-semibold">{appointment.duration} minutes</div>
                    </div>
                  </div>
                  
                  {appointment.notes && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="text-sm text-gray-600">Notes</div>
                      <p className="text-sm">{appointment.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <User className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{patients.length}</div>
            <div className="text-sm text-gray-600">Total Patients</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{appointments.length}</div>
            <div className="text-sm text-gray-600">Appointments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{medicalRecords.length}</div>
            <div className="text-sm text-gray-600">Medical Records</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Activity className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">
              {appointments.filter(a => a.status === 'scheduled').length}
            </div>
            <div className="text-sm text-gray-600">Upcoming</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            {patients.slice(0, 5).map((patient) => (
              <div key={patient.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div>
                  <div className="font-semibold">{patient.first_name} {patient.last_name}</div>
                  <div className="text-sm text-gray-600">{patient.email}</div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(patient.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments
              .filter(a => a.status === 'scheduled' || a.status === 'confirmed')
              .slice(0, 5)
              .map((appointment) => {
                const patient = patients.find(p => p.id === appointment.patient_id);
                return (
                  <div key={appointment.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div>
                      <div className="font-semibold">
                        {patient ? `${patient.first_name} ${patient.last_name}` : 'Unknown'}
                      </div>
                      <div className="text-sm text-gray-600">{appointment.purpose}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(appointment.appointment_date).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">Patient Dashboard</CardTitle>
                <p className="text-purple-100">Comprehensive health record management</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-purple-100">Total Patients</div>
              <div className="text-lg font-semibold">{patients.length}</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <Card>
        <CardContent className="p-0">
          <div className="flex border-b">
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'patients'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('patients')}
            >
              Patients
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'appointments'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'patients' && renderPatientList()}
      {activeTab === 'appointments' && renderAppointments()}
    </div>
  );
};

export default PatientDashboard;
