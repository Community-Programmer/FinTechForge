import { swaggerSpec } from './src/config/swagger';

console.log('Swagger specification generated successfully!');
console.log('API Title:', swaggerSpec.info?.title);
console.log('API Version:', swaggerSpec.info?.version);
console.log('Paths found:', Object.keys(swaggerSpec.paths || {}).length);

// Display some example paths
const paths = Object.keys(swaggerSpec.paths || {});
console.log('\nDocumented endpoints:');
paths.slice(0, 10).forEach(path => {
  console.log(`  ${path}`);
});

if (paths.length > 10) {
  console.log(`  ... and ${paths.length - 10} more endpoints`);
}