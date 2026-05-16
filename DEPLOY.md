# 🚀 Guia de Deploy — escala-irmaos-2026-mai

Passo-a-passo para você publicar o site no GitHub + Vercel.
**Tempo total estimado: ~5 minutos.**

---

## ✅ Pré-requisitos

- [ ] Git instalado (`git --version`)
- [ ] Conta no GitHub (você já tem: `flaviocom`)
- [ ] Conta na Vercel conectada ao GitHub

---

## PARTE 1 — Preparar o projeto localmente

### 1.1. Descompactar o ZIP

Extraia o `escala-irmaos-2026-mai.zip` em:

```
D:\Antigravity\Meus-Projetos\escala-irmaos-2026-mai
```

### 1.2. Instalar dependências e testar

Abra o terminal nessa pasta e rode:

```bash
npm install
npm run dev
```

Abra `http://127.0.0.1:5173` no navegador. **Confira:**

- ✅ Header mostra "Escala Porteiros" + "JD. SÃO LUIZ · 2026" + badge âmbar "⚠ Provisória"
- ✅ Tooltip ao passar o mouse no badge mostra "Enquanto durar a reforma"
- ✅ Primeira data visível: **17/05/2026 (Dom Manhã)** com **Adilson, Luíz Cezar, Marcos**
- ✅ Vá em "Validação" — todos os **7 checks devem passar** ✓
- ✅ Vá em "Estatísticas" — confira a distribuição dos irmãos

Se algo estiver errado, **pare aqui** e me avise antes de subir.

---

## PARTE 2 — Subir no GitHub

### 2.1. Criar o repositório no GitHub

1. Abra https://github.com/new
2. **Repository name:** `escala-irmaos-2026-mai`
3. **Description:** `Escala provisória de Porteiros - JD. São Luiz - Mai/Dez 2026`
4. **Visibilidade:** Public (igual ao original)
5. **NÃO marque** "Add a README" nem "Add .gitignore" (já temos)
6. Clique em **"Create repository"**

> 💡 GitHub mostrará uma página com comandos. Use o bloco **"…or push an existing repository from the command line"**.

### 2.2. Push do código

No terminal, dentro da pasta `escala-irmaos-2026-mai`:

```bash
git init
git add .
git commit -m "feat: versão inicial - escala provisória 17/05 a 31/12/2026"
git branch -M main
git remote add origin https://github.com/flaviocom/escala-irmaos-2026-mai.git
git push -u origin main
```

> Se pedir credenciais, use seu **Personal Access Token** do GitHub (não a senha da conta).

Após o push, atualize a página do GitHub — você verá todos os arquivos.

---

## PARTE 3 — Deploy na Vercel

### 3.1. Importar o repositório

1. Abra https://vercel.com/new
2. Em **"Import Git Repository"**, encontre `escala-irmaos-2026-mai` na lista
3. Clique em **"Import"**

### 3.2. Configurar (geralmente automático)

A Vercel já detecta que é um projeto **Vite**. Se quiser conferir:

| Campo | Valor |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

> ⚠️ **Não precisa adicionar variáveis de ambiente** — o projeto é 100% client-side, sem segredos.

### 3.3. Deploy

Clique em **"Deploy"**. Aguarde ~1 minuto.

Ao final, a Vercel mostra a URL pública:

```
https://escala-irmaos-2026-mai.vercel.app
```

### 3.4. (Opcional) Domínio customizado

Se quiser uma URL diferente:

1. Vá em **Project Settings → Domains**
2. Adicione um domínio (ex: `escala-provisoria.flaviocom.com`)
3. Configure o DNS conforme instruções da Vercel

---

## PARTE 4 — Após o deploy

### 4.1. Compartilhar com os irmãos

A URL final fica algo como:

```
https://escala-irmaos-2026-mai.vercel.app
```

### 4.2. Atualizações futuras

Para qualquer mudança no código:

```bash
# Fazer alterações nos arquivos
git add .
git commit -m "fix: descrição da mudança"
git push
```

A Vercel **redeploya automaticamente** em ~30 segundos.

---

## 🆘 Troubleshooting

### "permission denied" no `git push`

Você precisa autenticar. Opções:

- **GitHub CLI:** `gh auth login` (mais fácil)
- **Personal Access Token:** criar em https://github.com/settings/tokens → escopo `repo` → usar como senha no push

### Build falha na Vercel

Verifique se rodou `npm run build` localmente sem erros antes do push. Se aparecer erro relacionado a Node.js, vá em **Vercel → Project Settings → General → Node.js Version** e coloque `20.x`.

### Página em branco no deploy

Quase sempre é cache do navegador. Pressione `Ctrl+Shift+R` (ou `Cmd+Shift+R` no Mac) para hard reload.

---

## 📞 Checklist final

- [ ] `npm run dev` funciona localmente
- [ ] Aba "Validação" passa nos 7 checks
- [ ] Repositório `escala-irmaos-2026-mai` existe no GitHub
- [ ] `git push` foi feito com sucesso
- [ ] Projeto importado na Vercel
- [ ] URL pública acessível e funcional
- [ ] Testado em celular (responsivo)

Qualquer dúvida no processo, me avisa! 🚀
