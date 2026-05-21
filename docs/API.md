# Medical MCP API Documentation

## Overview

The Medical MCP server provides a comprehensive set of tools for healthcare operations through the Model Context Protocol.

## Tools

### Patient Management

#### get_patient
Retrieve detailed patient information by ID.

**Parameters:**
- `patient_id` (string, required): The unique patient identifier

**Response:**
```json
{
  "id": "P001",
  "name": "John Doe",
  "age": 45,
  "mrn": "MRN-001",
  "conditions": ["Hypertension", "Type 2 Diabetes"],
  "medications": ["Lisinopril", "Metformin"],
  "allergies": ["Penicillin"]
}
```

#### list_patients
List patients, optionally filtered by department.

**Parameters:**
- `department` (string, optional): Department filter
- `limit` (number, optional): Maximum results to return

#### update_patient
Update patient information.

**Parameters:**
- `patient_id` (string, required): Patient ID
- `updates` (object, required): Fields to update

### Medications

#### get_medication
Get detailed medication information.

**Parameters:**
- `drug_name` (string, required): Drug name

**Response:**
```json
{
  "name": "Metformin",
  "genericName": "metformin hydrochloride",
  "dosage": ["500mg", "850mg", "1000mg"],
  "sideEffects": ["Nausea", "Diarrhea"],
  "contraindications": ["Renal impairment"]
}
```

#### check_drug_interactions
Check for interactions between medications.

**Parameters:**
- `medications` (array, required): List of medication names

#### search_medications
Search medications by condition.

**Parameters:**
- `condition` (string, optional): Medical condition
- `category` (string, optional): Drug category

### Laboratory Tests

#### get_lab_results
Retrieve lab results for a patient.

**Parameters:**
- `patient_id` (string, required): Patient ID
- `test_type` (string, optional): Filter by test type
- `start_date` (string, optional): Start date (YYYY-MM-DD)
- `end_date` (string, optional): End date (YYYY-MM-DD)

#### order_lab_test
Order a new laboratory test.

**Parameters:**
- `patient_id` (string, required): Patient ID
- `test_type` (string, required): Type of test
- `urgency` (string, optional): "routine" or "stat"

#### get_reference_ranges
Get reference ranges for lab values.

**Parameters:**
- `test_name` (string, required): Lab test name
- `age_group` (string, optional): Age group

### Appointments

#### schedule_appointment
Schedule a new appointment.

**Parameters:**
- `patient_id` (string, required): Patient ID
- `provider` (string, required): Healthcare provider
- `datetime` (string, required): ISO 8601 format
- `appointment_type` (string, optional): Type of appointment
- `duration_minutes` (number, optional): Duration in minutes

#### list_appointments
List appointments.

**Parameters:**
- `patient_id` (string, optional): Filter by patient
- `provider` (string, optional): Filter by provider
- `status` (string, optional): "scheduled", "completed", or "cancelled"
- `start_date` (string, optional): Start date filter

#### cancel_appointment
Cancel an appointment.

**Parameters:**
- `appointment_id` (string, required): Appointment ID
- `reason` (string, optional): Cancellation reason

#### get_provider_availability
Check provider availability.

**Parameters:**
- `provider` (string, required): Provider name
- `date` (string, required): Date (YYYY-MM-DD)

## Resources

Medical resources provide access to guidelines and reference materials:

- `guideline://cardiology` - Cardiology clinical guidelines
- `guideline://diabetes` - Diabetes management guidelines
- `guideline://hypertension` - Blood pressure management
- `guideline://infectious-disease` - Infection treatment protocols
- `reference://icd-10` - ICD-10 diagnostic codes
- `reference://drug-formulary` - Hospital drug formulary

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": true,
  "code": "ERROR_CODE",
  "message": "Human readable error message"
}
```

Common error codes:
- `PATIENT_NOT_FOUND` - Patient ID does not exist
- `INVALID_PARAMETER` - Invalid parameter provided
- `UNAUTHORIZED` - Access denied
- `SERVER_ERROR` - Internal server error
