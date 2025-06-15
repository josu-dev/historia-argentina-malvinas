<script lang="ts">
  import Main from "$lib/components/site/main.svelte";
  import Metadata from "$lib/components/site/metadata.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
</script>

<Metadata
  title="Inicar Sesion"
  description="Reservado solo para administradores. Iniciá sesión con tu cuenta de administrador para gestionar el contenido"
/>

<Main class="flex h-screen w-full items-center justify-center px-4">
  <Card.Root class="mx-auto w-full max-w-sm">
    <Card.Header>
      <Card.Title>
        <h1 class="text-2xl">Iniciar Sesion</h1>
      </Card.Title>
      <Card.Description>
        Solo los administradores pueden iniciar sesión para acceder al panel de control.
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <div class="grid gap-4 py-4">
        <Button variant="outline" href="/login/google" class="w-full no-underline">
          <span class="font-light text-2xl leading-none mr-2">G</span>
          <span class="underline"> Iniciar sesión con Google </span>
        </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        ¿No eres administrador?
        <a href="/" class="underline"> Ir al inicio </a>
      </div>
    </Card.Content>
  </Card.Root>
</Main>
