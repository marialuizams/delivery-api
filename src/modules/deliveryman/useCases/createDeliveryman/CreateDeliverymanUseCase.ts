import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

class CreateDeliveryManUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive"
        }
      }
    });

    if (deliverymanExists) {
      throw new Error("Username already exists!");
    }

    const passwordHash = await hash(password, 10);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: passwordHash
      }
    });

    return deliveryman;
  }
}

export { CreateDeliveryManUseCase }