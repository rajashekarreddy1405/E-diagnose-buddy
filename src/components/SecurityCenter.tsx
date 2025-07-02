
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, FileCheck, AlertTriangle, CheckCircle, Key, Database } from "lucide-react";

const SecurityCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All patient data is encrypted using AES-256 encryption both in transit and at rest",
      status: "Active",
      level: "High"
    },
    {
      icon: Eye,
      title: "Access Control",
      description: "Role-based access control ensures only authorized personnel can view patient data",
      status: "Active",
      level: "High"
    },
    {
      icon: FileCheck,
      title: "HIPAA Compliance",
      description: "Full compliance with HIPAA regulations for healthcare data protection",
      status: "Certified",
      level: "High"
    },
    {
      icon: Key,
      title: "Multi-Factor Authentication",
      description: "Two-factor authentication required for all healthcare provider accounts",
      status: "Active",
      level: "Medium"
    },
    {
      icon: Database,
      title: "Data Backup",
      description: "Automated daily backups with 99.9% recovery guarantee",
      status: "Active",
      level: "High"
    },
    {
      icon: Shield,
      title: "Audit Logging",
      description: "Complete audit trail of all data access and modifications",
      status: "Active",
      level: "High"
    }
  ];

  const complianceStandards = [
    { name: "HIPAA", status: "Compliant", description: "Health Insurance Portability and Accountability Act" },
    { name: "SOC 2 Type II", status: "Certified", description: "Security, Availability, and Confidentiality" },
    { name: "ISO 27001", status: "Compliant", description: "Information Security Management" },
    { name: "GDPR", status: "Compliant", description: "General Data Protection Regulation" },
    { name: "FDA 21 CFR Part 11", status: "Compliant", description: "Electronic Records and Signatures" }
  ];

  const securityMetrics = [
    { metric: "Data Encryption Level", value: "AES-256", status: "secure" },
    { metric: "Uptime Guarantee", value: "99.9%", status: "excellent" },
    { metric: "Security Incidents", value: "0", status: "excellent" },
    { metric: "Compliance Score", value: "100%", status: "excellent" },
    { metric: "Backup Frequency", value: "Daily", status: "secure" },
    { metric: "Access Attempts Blocked", value: "1,247", status: "secure" }
  ];

  const privacyPolicies = [
    {
      title: "Data Collection",
      description: "We only collect medical information necessary for diagnosis and treatment recommendations",
      details: ["Symptoms and medical history", "Basic demographic information", "Treatment outcomes and feedback"]
    },
    {
      title: "Data Usage",
      description: "Patient data is used solely for healthcare purposes and system improvement",
      details: ["Diagnosis and treatment recommendations", "Anonymized research for AI improvement", "Quality assurance and accuracy monitoring"]
    },
    {
      title: "Data Sharing",
      description: "Patient data is never shared with third parties without explicit consent",
      details: ["No marketing or commercial use", "No sale of patient information", "Emergency sharing only with patient consent"]
    },
    {
      title: "Data Retention",
      description: "Patient records are retained according to healthcare regulations",
      details: ["Medical records: 7 years minimum", "Diagnostic data: 5 years", "Anonymous analytics: Indefinite"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'compliant':
      case 'certified':
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'secure':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Security Status */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">System Secure</h3>
              <p className="text-green-600">All security protocols are active and functioning properly</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {securityMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-bold text-green-700">{metric.value}</div>
                <div className="text-sm text-green-600">{metric.metric}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {securityFeatures.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <IconComponent className="w-6 h-6 text-teal-600" />
                  <div className="flex-1">
                    <h3 className="font-medium">{feature.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getStatusColor(feature.status)}>{feature.status}</Badge>
                      <span className={`text-xs font-medium ${getLevelColor(feature.level)}`}>
                        {feature.level} Security
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Compliance Standards */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Standards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {complianceStandards.map((standard, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{standard.name}</div>
                  <div className="text-sm text-gray-600">{standard.description}</div>
                </div>
                <Badge className={getStatusColor(standard.status)}>{standard.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPrivacyPolicy = () => (
    <div className="space-y-6">
      {privacyPolicies.map((policy, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">{policy.title}</CardTitle>
            <p className="text-gray-600">{policy.description}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {policy.details.map((detail, detailIndex) => (
                <li key={detailIndex} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{detail}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}

      {/* Contact Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-800 mb-3">Privacy Questions?</h3>
          <p className="text-blue-700 text-sm mb-4">
            If you have any questions about our privacy practices or data handling, please contact our Privacy Officer.
          </p>
          <div className="space-y-2 text-sm text-blue-700">
            <div>Email: privacy@healthadvisor.com</div>
            <div>Phone: 1-800-PRIVACY (1-800-774-8229)</div>
            <div>Address: 123 Healthcare Blvd, Medical City, MC 12345</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDataManagement = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Management Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Eye className="w-6 h-6 mb-2" />
              <span>View My Data</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileCheck className="w-6 h-6 mb-2" />
              <span>Export Data</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Lock className="w-6 h-6 mb-2" />
              <span>Update Permissions</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col text-red-600">
              <AlertTriangle className="w-6 h-6 mb-2" />
              <span>Delete Account</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Processing Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Data Processing Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { activity: "Symptom analysis performed", time: "2 hours ago", user: "System AI" },
              { activity: "Medical record updated", time: "1 day ago", user: "Dr. Smith" },
              { activity: "Login successful", time: "3 days ago", user: "You" },
              { activity: "Data backup completed", time: "1 week ago", user: "System" }
            ].map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-sm">{log.activity}</div>
                  <div className="text-xs text-gray-600">By {log.user}</div>
                </div>
                <div className="text-xs text-gray-500">{log.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">Security & Privacy Center</CardTitle>
                <p className="text-teal-100">HIPAA-compliant data protection and privacy controls</p>
              </div>
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
                  ? 'border-teal-500 text-teal-600 bg-teal-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Security Overview
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'privacy'
                  ? 'border-teal-500 text-teal-600 bg-teal-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('privacy')}
            >
              Privacy Policy
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'data'
                  ? 'border-teal-500 text-teal-600 bg-teal-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('data')}
            >
              Data Management
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'privacy' && renderPrivacyPolicy()}
      {activeTab === 'data' && renderDataManagement()}
    </div>
  );
};

export default SecurityCenter;
