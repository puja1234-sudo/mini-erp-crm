import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      email,
      phone,
      address
    } = req.body;

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address,
      },
    });

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getCustomers = async (
  req: Request,
  res: Response
) => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getChallans = async (
  req: Request,
  res: Response
) => {
  try {
    const challans = await prisma.challan.findMany({
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: challans.length,
      data: challans,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
