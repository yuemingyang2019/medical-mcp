import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { patientTools } from "./tools/patients.js";
import { medicationTools } from "./tools/medications.js";
import { labTools } from "./tools/labs.js";
import { appointmentTools } from "./tools/appointments.js";
import { medicalResources } from "./resources/medical-guidelines.js";

// Initialize MCP Server
const server = new Server({
  name: "medical-mcp",
  version: "1.0.0",
});

// Combine all tools
const allTools = [
  ...patientTools,
  ...medicationTools,
  ...labTools,
  ...appointmentTools,
];

// Handle tool list requests
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: allTools,
  };
});

// Handle tool execution requests
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  const toolArgs = request.params.arguments;

  // Route to appropriate tool handler
  switch (toolName) {
    case "get_patient":
      return await getPatient(toolArgs.patient_id);
    case "list_patients":
      return await listPatients(toolArgs.department);
    case "get_medication":
      return await getMedication(toolArgs.drug_name);
    case "check_drug_interactions":
      return await checkDrugInteractions(toolArgs.medications);
    case "get_lab_results":
      return await getLabResults(toolArgs.patient_id);
    case "schedule_appointment":
      return await scheduleAppointment(toolArgs);
    case "list_appointments":
      return await listAppointments(toolArgs.patient_id);
    default:
      return {
        content: [
          {
            type: "text",
            text: `Unknown tool: ${toolName}`,
          },
        ],
        isError: true,
      };
  }
});

// Handle resource requests
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: medicalResources,
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (uri === "guideline://cardiology") {
    return {
      contents: [
        {
          uri: uri,
          mimeType: "text/plain",
          text: "Cardiology Guidelines:\n1. Blood Pressure Management\n2. Arrhythmia Treatment\n3. Heart Failure Management",
        },
      ],
    };
  }

  return {
    contents: [
      {
        uri: uri,
        mimeType: "text/plain",
        text: "Resource not found",
      },
    ],
  };
});

// Tool implementation stubs
async function getPatient(patientId: string) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          id: patientId,
          name: "John Doe",
          age: 45,
          mrn: "MRN-001",
          conditions: ["Hypertension", "Type 2 Diabetes"],
        }),
      },
    ],
  };
}

async function listPatients(department?: string) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify([
          { id: "P001", name: "John Doe", department: "Cardiology" },
          { id: "P002", name: "Jane Smith", department: "Neurology" },
        ]),
      },
    ],
  };
}

async function getMedication(drugName: string) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          name: drugName,
          genericName: "example_generic",
          dosage: "500mg",
          sideEffects: ["Nausea", "Headache"],
          contraindications: [],
        }),
      },
    ],
  };
}

async function checkDrugInteractions(medications: string[]) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          medications: medications,
          interactions: [],
          severity: "none",
        }),
      },
    ],
  };
}

async function getLabResults(patientId: string) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          patientId: patientId,
          results: [
            { test: "CBC", value: "Normal", date: "2025-05-15" },
            { test: "BMP", value: "Normal", date: "2025-05-15" },
          ],
        }),
      },
    ],
  };
}

async function scheduleAppointment(args: any) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify({
          appointmentId: "APT-001",
          patientId: args.patient_id,
          provider: args.provider,
          dateTime: args.datetime,
          status: "scheduled",
        }),
      },
    ],
  };
}

async function listAppointments(patientId: string) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify([
          {
            id: "APT-001",
            patientId: patientId,
            provider: "Dr. Smith",
            dateTime: "2025-06-01 10:00",
          },
        ]),
      },
    ],
  };
}

// Start server
async function main() {
  const port = process.env.MCP_SERVER_PORT || 3000;
  await server.connect();
  console.log(`Medical MCP server running on port ${port}`);
}

main().catch(console.error);

export { server };
