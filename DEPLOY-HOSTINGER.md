# 🚀 Guia de Deploy - Sabrina Buenos Imóveis na Hostinger

## 📋 Checklist Pré-Deploy

### ✅ Arquivos Essenciais
- [x] `index.html` - Página principal
- [x] `casa-quintal-amplo.html` - Página do imóvel
- [x] `casa-terrea-jardim-santa-teresa.html` - Página do imóvel
- [x] `condominio-veneza.html` - Página do imóvel
- [x] `sobrado-mogi-das-cruzes.html` - Página do imóvel
- [x] `src/` - Diretório com assets
- [x] `.htaccess` - Configurações do servidor
- [x] `robots.txt` - SEO
- [x] `sitemap.xml` - SEO

### ✅ Imagens Verificadas
- [x] Todas as imagens estão nos caminhos corretos
- [x] Diretório `Veneza/` com V maiúsculo corrigido
- [x] Imagens JPEG carregando corretamente

## 🌐 Passo a Passo - Deploy na Hostinger

### 1. **Acessar o Painel da Hostinger**
1. Faça login no painel da Hostinger
2. Vá em **"Hospedagem"** → **"Gerenciar"**
3. Clique em **"File Manager"**

### 2. **Limpar o Diretório Public_html**
1. Entre na pasta `public_html`
2. **DELETE todos os arquivos existentes** (se houver)
3. Mantenha apenas a estrutura vazia

### 3. **Upload dos Arquivos**
1. **Selecione todos os arquivos** do projeto SA
2. **Comprima em ZIP** (opcional, mas recomendado)
3. **Faça upload** para `public_html`
4. **Extraia o ZIP** se necessário

### 4. **Estrutura Final no Servidor**
```
public_html/
├── index.html
├── casa-quintal-amplo.html
├── casa-terrea-jardim-santa-teresa.html
├── condominio-veneza.html
├── sobrado-mogi-das-cruzes.html
├── logo-minha-casa-minha-vida-branca.png
├── robots.txt
├── sitemap.xml
├── .htaccess
├── styles.css
└── src/
    ├── assets/
    │   └── images/
    │       ├── Casa/
    │       ├── Quintal/
    │       ├── sobrado/
    │       ├── Veneza/
    │       ├── logos/
    │       └── ...
    ├── css/
    │   └── main.css
    └── js/
        └── main.js
```

### 5. **Configurações DNS (se necessário)**
1. Se usando domínio próprio:
   - Aponte o domínio para a Hostinger
   - Configure os nameservers
2. Se usando subdomínio da Hostinger:
   - Já está configurado automaticamente

### 6. **Testes Pós-Deploy**
1. **Acesse o site** pelo domínio
2. **Teste todas as páginas**:
   - Página inicial
   - Casa com Quintal Amplo
   - Casa Térrea Jardim Santa Teresa
   - Condomínio Veneza
   - Sobrado Mogi das Cruzes
3. **Verifique as imagens**:
   - Todas carregando?
   - Galerias funcionando?
   - Carrosséis funcionando?
4. **Teste responsividade**:
   - Mobile
   - Tablet
   - Desktop
5. **Teste funcionalidades**:
   - Botões WhatsApp
   - Links de navegação
   - Formulários (se houver)

## 🔧 Configurações Adicionais

### **SSL/HTTPS**
- A Hostinger já fornece SSL gratuito
- Ative no painel se necessário
- O `.htaccess` já está preparado para HTTPS

### **Performance**
- O `.htaccess` já inclui:
  - Compressão GZIP
  - Cache do navegador
  - Headers de segurança
  - Otimização mobile

### **SEO**
- `robots.txt` configurado
- `sitemap.xml` incluído
- Meta tags otimizadas
- Schema.org implementado

## 📱 Teste de Funcionamento

### **URLs para Testar**
- `https://seudominio.com/` - Página inicial
- `https://seudominio.com/casa-quintal-amplo.html`
- `https://seudominio.com/casa-terrea-jardim-santa-teresa.html`
- `https://seudominio.com/condominio-veneza.html`
- `https://seudominio.com/sobrado-mogi-das-cruzes.html`

### **Funcionalidades para Verificar**
- ✅ Carrossel de imagens funcionando
- ✅ Botões WhatsApp funcionando
- ✅ Navegação entre páginas
- ✅ Responsividade mobile
- ✅ Carregamento rápido das imagens
- ✅ Links externos funcionando

## 🚨 Troubleshooting

### **Se as imagens não carregarem:**
1. Verifique se a pasta `src/assets/images/` foi enviada
2. Confirme se os nomes dos arquivos estão corretos
3. Verifique permissões das pastas (755)

### **Se o site não carregar:**
1. Verifique se o `index.html` está na raiz do `public_html`
2. Confirme se não há erros no `.htaccess`
3. Verifique logs de erro no painel da Hostinger

### **Se houver erro 500:**
1. Temporariamente renomeie `.htaccess` para `.htaccess.bak`
2. Teste se o site carrega
3. Se carregar, há problema no `.htaccess`

## 📊 Monitoramento

### **Ferramentas Recomendadas**
- **Google PageSpeed Insights** - Performance
- **Google Search Console** - SEO
- **Google Analytics** - Tráfego
- **GTmetrix** - Performance detalhada

## 🎯 Próximos Passos

1. **Deploy** seguindo este guia
2. **Testes** completos
3. **Configurar Analytics** (Google Analytics)
4. **Submeter ao Google Search Console**
5. **Monitorar performance** semanalmente

---

**🎉 Seu site estará online e funcionando perfeitamente na Hostinger!**

**Tempo estimado de deploy:** 15-30 minutos
**Tempo para propagação DNS:** 2-24 horas (se usando domínio próprio)
