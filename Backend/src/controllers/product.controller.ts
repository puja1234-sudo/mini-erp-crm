import { Request, Response } from "express";
import prisma from "../prisma/client";

// ================= CREATE =================

export const createProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, sku, price, stock } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        price: Number(price),
        stock: Number(stock),
      },
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= GET =================

export const getProducts = async (
  req: Request,
  res: Response
) => {
  try {

    const products = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ================= UPDATE =================

export const updateProduct = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } = req.params;

    const { name, price, stock } = req.body;

    const product = await prisma.product.update({

      where: {
        id: Number(id),
      },

      data: {
        name,
        price: Number(price),
        stock: Number(stock),
      },

    });

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      data: product,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

};
// ================= DELETE =================
export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


