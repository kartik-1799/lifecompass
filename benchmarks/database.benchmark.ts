import Benchmark from 'benchmark';

const suite = new Benchmark.Suite();

suite
  .add('Database#insert', () => {
    // Benchmark insert
  })
  .add('Database#query', () => {
    // Benchmark query
  })
  .on('cycle', (event: any) => {
    console.log(String(event.target));
  })
  .run({ async: true });
