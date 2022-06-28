type SumParameters = {
  a: number;
  b: number;
};

export default function sum({ a, b }: SumParameters) {
  return a + b;
}
