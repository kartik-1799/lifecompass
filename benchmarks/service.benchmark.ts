import Benchmark from 'benchmark';

const suite = new Benchmark.Suite();

suite
  .add('Service#operation1', () => {
    // Benchmark operation 1
  })
  .add('Service#operation2', () => {
    // Benchmark operation 2
  })
  .on('cycle', (event: any) => {
    console.log(String(event.target));
  })
  .on('complete', function(this: any) {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
