import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const totalProducts = await prisma.product.count();
    const totalCustomers = await prisma.customer.count();
    const totalChallans = await prisma.challan.count();

    const lowStockProducts = await prisma.product.count({
      where: {
        stock: {
          lte: 5,
        },
      },
    });

    const revenue = await prisma.challan.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: "CONFIRMED",
      },
    });

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalCustomers,
        totalChallans,
        lowStockProducts,
        totalRevenue: revenue._sum.totalAmount || 0,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};