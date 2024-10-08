"use client";
import { useEffect, useState } from "react";
import NavbarComponent from "./components/navbar/navbar";
import TapsComponent from "./components/taps/taps";

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@nextui-org/table";

import { useContxApp, useContxAppTgg } from './provider/AuthReducer';
import AuthService from './connections/auth'
import UserProvider from './provider/AuthReducer'

import BeneficiarioService from "./connections/api/beneficiarios.service";
import ChalecosService from "./connections/api/chalecos.service";
import UsuariosService from "./connections/api/usuarios.service";

const benef_service = new BeneficiarioService();
const chal_service = new ChalecosService();
const user_service = new UsuariosService();
const auth_service = new AuthService();

export default function Home() {
  const context = useContxApp();
  const contextTgg = useContxAppTgg();

  const sColumnsBen = [
    { key: "cedula", label: "Cedula" },
    { key: "nombre", label: "Nombre" },
    { key: "direccion", label: "Direccion" },
    { key: "poblacion", label: "Poblacion" },
    { key: "acciones", label: "Acciones" },
  ]

  const sColumnsChl = [
    { key: "serial", label: "Serial" },
    { key: "cedula_bnf", label: "Cedula Beneficiario" },
    { key: "acciones_clh", label: "Acciones" },
  ]

  const sColumnsUsr = [
    { key: "nombre_usr", label: "Nombre Usuario" },
    { key: "password", label: "Constraseña" },
    { key: "acciones_usr", label: "Acciones" },
  ]

  const [columns, setColumns] = useState(sColumnsBen)
  const [event, setEvent] = useState('')
  const [rows, setRows] = useState([])

  function onChangeTab(_event: string) {
    setEvent(_event)
    if (_event === "01") {
      setColumns(sColumnsBen)
    } else if (_event === "02") {
      setColumns(sColumnsChl)
    } else if (_event === "03") {
      setColumns(sColumnsUsr)
    }
  }

  useEffect(() => {

    if (event === '01') {
      (async () => {
        try {
          const sResponse = await benef_service.get(context?.token, context?.refresh);
          setRows(sResponse)
        }
        catch (error) {
          console.error(error)
        }
      })();
    }
    else if (event === '02') {
      (async () => {
        try {
          const sResponse = await chal_service.get(context?.token, context?.refresh);
          setRows(sResponse)
        }
        catch (error) {
          console.error(error)
        }
      })();
    }
    else if (event === '03') {
      (async () => {
        try {
          const sResponse = await user_service.get(context?.token, context?.refresh);
          setRows(sResponse)
        }
        catch (error) {
          console.error(error)
        }
      })();
    }

  }, [event, context?.token, context?.refresh]);

  useEffect(() => {
    (async () => {
      try {
        const oResponse = await auth_service.generate_token();
        if (oResponse.type == 'Success') {
          contextTgg({
            user: 'basic',
            token: oResponse.data.access,
            refresh: oResponse.data.refresh,
          })
        }
      }
      catch (error) {
        console.error(error)
      }
    })();
  }, [])

  return (
    <UserProvider>
      <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-white">
        <main>
          <div className="text-[#3C526F]">
            <NavbarComponent />
          </div>
          <div className="w-60 ml-8 mt-10">
            <TapsComponent onTabChange={onChangeTab} />
          </div>
          <div className="text-black">
            <Table aria-label="Data Crud">
              <TableHeader columns={columns} className="text-left">
                {(column) => <TableColumn key={column.key} className="text-left">{column.label}</TableColumn>}
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </UserProvider>
  );
}
