"use client";
import { Button } from "@heroui/button";
import {
    SiFacebook,
    SiGithub,
    SiInstagram,
    SiX,
} from "@icons-pack/react-simple-icons";
import { LibraryBig, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 md:px-6 py-16 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Link className="flex justify-start items-center gap-1" href="/">
                <LibraryBig />
                <h3 className="text-xl font-bold">Rumo a Vaga</h3>
              </Link>
            </div>
            <p className="text-muted-foreground">
              Esta é uma versão de demonstração do Rumo a Vaga, espere por mais
              novidades em breve.
            </p>
            <div className="flex space-x-3">
              <Button isIconOnly variant="ghost" aria-label="Facebook">
                <SiFacebook className="h-5 w-5" />
              </Button>
              <Button isIconOnly variant="ghost" aria-label="Twitter">
                <SiX className="h-5 w-5" />
              </Button>
              <Button isIconOnly variant="ghost" aria-label="Instagram">
                <SiInstagram className="h-5 w-5" />
              </Button>
              <Button isIconOnly variant="ghost" aria-label="GitHub">
                <SiGithub className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Links Rápidos</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contato</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>Um dia eu vou ter um endereço</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 shrink-0" />
                <span>Um dia eu vou ter um telefone</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 shrink-0" />
                <span>avictorg@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Assine</h4>
            <p className="text-muted-foreground">
              Receba novidades e atualizações sobre o Rumo a Vaga.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              {/* <Input label="Teste" /> */}
              <Button>Assinar</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rumo a vaga. Todos os direitos
            reservados.
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Cookies Settings
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
