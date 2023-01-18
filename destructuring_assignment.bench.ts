import { createBench } from "./utils.ts";

const user = {
  id: 1,
  name: "John",
  age: 20,
  email: "something@gmail.com",
  address: "some address",
  phone: "123456789",
};

createBench([
  {
    name: "direct assignment",
    baseline: true,
    fn: () => {
      return {
        id: user.id,
        name: user.name,
        age: user.age,
      };
    },
  },
  {
    name: "destructuring assignment",
    fn: () => {
      const { id, name, age } = user;
      return {
        id,
        name,
        age,
      };
    },
  },
]);
