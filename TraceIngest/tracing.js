const { NodeTracerProvider } = require("@opentelemetry/node");
const { SimpleSpanProcessor, ConsoleSpanExporter } = require("@opentelemetry/tracing");
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const {
    CollectorTraceExporter,
} = require("@opentelemetry/exporter-collector-proto");
const dtCreds = require('./config.js')

// Create a tracer provider
const provider = new NodeTracerProvider();

// Dynatrace options
const OTLPoptions = {
    serviceName: "HelloWorld",
    url: dtCreds.getDTCreds().DTURL,
    headers: {
        Authorization: "API-Token " + dtCreds.getDTCreds().APITOKEN
    }
}
//console.log(dtCreds.getDTCreds().DTURL)
console.log(JSON.stringify(OTLPoptions));

// The exporter handles sending spans to your tracing backend
const collectorExporter = new CollectorTraceExporter(OTLPoptions);

const consoleExporter = new ConsoleSpanExporter();

// The simple span processor sends spans to the exporter as soon as they are ended.
const processor = new SimpleSpanProcessor(collectorExporter);
provider.addSpanProcessor(processor);
provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));

// The provider must be registered in order to
// be used by the OpenTelemetry API and instrumentations
provider.register();

// This will automatically enable all instrumentations
registerInstrumentations({
  instrumentations: [getNodeAutoInstrumentations()],
});