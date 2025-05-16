import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { CATEGORY } from "./constant.js";

const prisma = new PrismaClient();

async function seedUsers() {
  Array.from({ length: 10 }, (v, i) => i).forEach(async () => {
    const userData = {
      email: faker.internet.email(),
      name: faker.person.lastName() + faker.person.firstName(),
      image: faker.image.avatar(),
      desc: faker.lorem.paragraph(),
    };
    const res = await prisma.user.create({
      data: userData,
    });
    console.log(res);
  });
}

async function seedRooms() {
  const totalUsers = await prisma.user.findMany();
  if (totalUsers?.length > 1) {
    Array.from({ length: 20 }, (v, i) => i).forEach(async () => {
      const randomUserIndex = Math.floor(Math.random() * totalUsers.length);
      const randomUser = totalUsers[randomUserIndex];

      const roomData = {
        title: faker.lorem.words(),
        images: [
          faker.image.urlLoremFlickr({
            category: "hotel",
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            width: 500,
            height: 500,
            category: "travel",
          }),
          faker.image.urlLoremFlickr({
            width: 500,
            height: 500,
            category: "nature",
          }),
          faker.image.urlLoremFlickr({
            width: 500,
            height: 500,
            category: "building",
          }),
        ],
        lat: getRandomLatitude(),
        lng: getRandomLngtitude(),
        address:
          faker.location.state() +
          faker.location.street() +
          faker.location.streetAddress({
            useFullAddress: true,
          }),
        desc: faker.lorem.paragraphs(),
        category: CATEGORY[Math.floor(Math.random() * CATEGORY.length)],
        bedroomDesc: faker.lorem.words(),
        price: parseInt(faker.commerce.price({ min: 50000, max: 500000, dec: 0 })),
        freeCancel: faker.datatype.boolean(),
        selfCheckIn: faker.datatype.boolean(),
        officeSpace: faker.datatype.boolean(),
        hasMountainView: faker.datatype.boolean(),
        hasShampoo: faker.datatype.boolean(),
        hasFreeLaundry: faker.datatype.boolean(),
        hasAirConditioner: faker.datatype.boolean(),
        hasWifi: faker.datatype.boolean(),
        hasBarbeque: faker.datatype.boolean(),
        userId: randomUser.id,
      };
      const res = await prisma.room.create({
        data: roomData,
      });
      console.log("roomData : ", res);
    });
  }
}

// 서울 위도/경도값 랜덤 함수
function getRandomLatitude() {
  const minLatitude = 37.4316;
  const maxLatitude = 37.701;

  return faker.number
    .float({
      min: minLatitude,
      max: maxLatitude,
      fractionDigits: 6,
    })
    ?.toString();
}

function getRandomLngtitude() {
  const minLatitude = 126.7963;
  const maxLatitude = 127.1839;

  return faker.number
    .float({
      min: minLatitude,
      max: maxLatitude,
      fractionDigits: 6,
    })
    ?.toString();
}

async function main() {
  await seedUsers();
  await seedRooms();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
