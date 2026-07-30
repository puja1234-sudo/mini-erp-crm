import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createChallan = async (
  req: Request,
  res: Response
) => {
  try {
    const { customerId, items } = req.body;

    let totalAmount = 0;

    // Calculate total amount
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.productId} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`,
        });
      }

      totalAmount += product.price * item.quantity;
    }

    // Create Challan
    const challan = await prisma.challan.create({
      data: {
        customerId,
        totalAmount,
      },
    });

    // Create Challan Items & Update Stock
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      await prisma.challanItem.create({
        data: {
          challanId: challan.id,
          productId: item.productId,
          quantity: item.quantity,
          price: product!.price,
        },
      });

      await prisma.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });

      await prisma.stockMovement.create({
        data: {
          productId: item.productId,
          quantity: item.quantity,
          movement: "OUT",
        },
      });
    }

    res.status(201).json({
      success: true,
      message: "Challan Created Successfully",
      data: challan,
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
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
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

export const confirmChallan = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const challan = await prisma.challan.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "CONFIRMED",
      },
    });

    res.status(200).json({
      success: true,
      message: "Challan Confirmed Successfully",
      data: challan,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};