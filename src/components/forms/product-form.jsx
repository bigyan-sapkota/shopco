"use client";

import {
  Button,
  Group,
  Image,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { RichTextEditor } from "@mantine/tiptap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAddProduct } from "../../mutations/use-add-product";
import { useUpdateProduct } from "../../mutations/use-update-product";
import useProduct from "../../queries/use-product";

export default function ProductForm() {
  const params = useParams();
  const productId = params?.id;

  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct(productId);

  const { data: product } = useProduct(productId);

  const [preview, setPreview] = useState(product?.image || null);

  const form = useForm({
    initialValues: {
      title: product?.title || "",
      category: product?.category || "fruits",
      price: product?.price || 0,
      discount: product?.discount || 0,
      stock: product?.stock || 0,
      description: product?.description || "",
      image: product?.image || null,
    },

    validate: {
      title: (value) =>
        !value
          ? "Title is required"
          : value.length > 200
            ? "Max 200 characters"
            : null,
      category: (value) =>
        !["fruits", "vegetables"].includes(value)
          ? "Category must be fruits or vegetables"
          : null,
      price: (value) =>
        value <= 0
          ? "Price must be greater than 0"
          : value > 100000
            ? "Price too high"
            : null,
      discount: (value) =>
        value < 0
          ? "Discount must be at least 0"
          : value > 100
            ? "Discount cannot exceed 100"
            : null,
      stock: (value) =>
        value < 0
          ? "Stock must be greater than 0"
          : value > 10000
            ? "Stock too high"
            : null,
    },
  });

  useEffect(() => {
    if (product) {
      form.setValues({
        title: product.title,
        category: product.category,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        description: product.description,
        image: product.image,
      });
      setPreview(product.image || null);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      form.setFieldValue("image", file);
    }
  };

  const handleSubmit = form.onSubmit(async (values) => {
    if (productId) {
      await updateProduct.mutateAsync(values);
    } else {
      const { title, category, price, discount, stock, description, image } =
        values;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("price", price);
      if (discount) formData.append("discount", parseInt(discount));
      if (stock) formData.append("stock", parseInt(stock));
      if (description) formData.append("description", description);
      if (image) formData.append("image", image);
      await addProduct.mutateAsync(formData);
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="md">
        <TextInput label="Product Title" {...form.getInputProps("title")} />

        <Select
          label="Category"
          data={[
            { value: "fruits", label: "Fruits" },
            { value: "vegetables", label: "Vegetables" },
          ]}
          {...form.getInputProps("category")}
        />

        <NumberInput label="Price" {...form.getInputProps("price")} />
        <NumberInput label="Discount (%)" {...form.getInputProps("discount")} />
        <NumberInput label="Stock" {...form.getInputProps("stock")} />

        <div>
          <label>Description</label>
          <RichTextEditor
            value={form.values.description}
            onChange={(content) => form.setFieldValue("description", content)}
            controls={[
              ["bold", "italic", "underline"],
              ["h1", "h2", "h3"],
              ["unorderedList", "orderedList"],
              ["link"],
            ]}
            style={{ minHeight: 200 }}
          />
        </div>

        <div>
          <label>Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              mt="sm"
              radius="md"
              width={200}
            />
          )}
        </div>

        <Group position="right" mt="md">
          <Button
            type="submit"
            loading={addProduct.isLoading || updateProduct.isLoading}
          >
            {productId ? "Update Product" : "Add Product"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
