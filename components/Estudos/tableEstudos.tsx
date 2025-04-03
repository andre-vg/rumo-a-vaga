"use client";
import React, { SVGProps, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { User } from "@heroui/user";
import { Chip, ChipProps } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { useSession } from "next-auth/react";
import { Pagination } from "@heroui/pagination";
import clsx from "clsx";
import moment from "moment";

import "moment/locale/pt-br";
import { Edit3Icon, Trash2 } from "lucide-react";
import { useDisclosure } from "@heroui/modal";

import EditStudy from "../modals/editStudy";
import DeleteModal from "../modals/deleteModal";

import { Database } from "@/database.types";
import { formatSecondsToHHMMSS } from "@/utils/secondsToDateString";
import { supabase } from "@/utils/supabase/client";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const columns = [
  { name: "Data/Tempo", uid: "name" },
  { name: "Matéria/Tópico", uid: "topic" },
  { name: "Periodo", uid: "period" },
  { name: "Ações", uid: "actions" },
];

const periodColorMap: Record<string, ChipProps["color"]> = {
  Manhã: "primary",
  Tarde: "warning",
  Noite: "secondary",
};

export default function TableEstudos() {
  const [totalPages, setTotalPages] = React.useState(0);
  const [page, setPage] = React.useState<number>(1);
  const [study, setStudy] = React.useState<
    Database["public"]["Tables"]["Study"]["Row"][]
  >([]);
  const [item, setItem] = React.useState<
    Database["public"]["Tables"]["Study"]["Row"] | null
  >(null);
  const { data } = useSession();

  const editDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();

  const renderCell = React.useCallback(
    (
      stud: Database["public"]["Tables"]["Study"]["Row"],
      columnKey: React.Key,
    ) => {
      const cellValue =
        stud[columnKey as keyof Database["public"]["Tables"]["Study"]["Row"]];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                radius: "md",
                //@ts-ignore
                src: stud.Subject.image,
                size: "lg",
                classNames:{
                  base: "aspect-square",
                }
              }}
              description={
                <>
                  <p className="text-white text-sm">
                    {moment(stud.date).format("LL")}
                  </p>
                  <p>
                    <span className="text-bold text-sm">Tempo de estudo: </span>{" "}
                    {formatSecondsToHHMMSS(Number(stud.time))}
                  </p>
                </>
              }
              name={cellValue}
            />
          );
        case "topic":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {/* @ts-ignore */}
                {stud.Subject.name}
              </p>
              <p className="text-bold text-sm capitalize text-default-400">
                {stud.topic}
              </p>
            </div>
          );
        case "period":
          return (
            <Chip
              className={clsx("capitalize")}
              color={periodColorMap[stud.period as string]}
              variant="flat"
            >
              {stud.period}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center justify-end gap-2">
              <Tooltip content="Editar">
                <Edit3Icon
                  className="text-default hover:text-white cursor-pointer transition-all duration-200"
                  onClick={() => {
                    setItem(stud);
                    editDisclosure.onOpen();
                  }}
                />
              </Tooltip>
              <Tooltip color="danger" content="Deletar Estudo">
                <Trash2
                  className="text-danger opacity-70 hover:opacity-100 cursor-pointer transition-all duration-200"
                  onClick={() => {
                    // setItem(stud);
                    // deleteDisclosure.onOpen();
                    alert("Ainda não podemos deletar estudos, desculpe...");
                  }}
                />
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  async function getStudys() {
    await supabase()
      .from("Study")
      .select("*, Subject(id, name, image)")
      .eq("userId", data?.user?.email!)
      .order("id", { ascending: false })
      .range((page - 1) * 10, page * 10 - 1)
      .then((res) => {
        setStudy(res.data ?? []);
      });
  }

  async function getTotalPages() {
    await supabase()
      .from("Study")
      .select("*", { count: "estimated", head: true })
      .eq("userId", data?.user?.email!)
      .then((res) => {
        setTotalPages(res.count ?? 0);
      });
  }

  useEffect(() => {
    if (data) {
      getStudys();
      getTotalPages();
    }
  }, [data]);

  useEffect(() => {
    getStudys();
  }, [page]);

  return (
    <>
      <Table
        aria-label="Example table with custom cells"
        bottomContent={
          page && (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page ?? 1}
                total={Math.ceil(totalPages / 10)}
                onChange={(page) => setPage(page)}
              />
            </div>
          )
        }
        classNames={{
          wrapper: "mt-8",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "end" : "start"}
              className="text-md"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={study}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <EditStudy
        isOpen={editDisclosure.isOpen}
        study={item as Database["public"]["Tables"]["Study"]["Row"]}
        onOpenChange={editDisclosure.onOpenChange}
      />
      <DeleteModal disclosure={deleteDisclosure} />
    </>
  );
}
