using FinanceAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// 🔧 Serviços
builder.Services.AddSingleton<DespesaService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 🔧 Middleware
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();

app.UseStaticFiles(); // ✅ Serve os arquivos da pasta wwwroot

app.UseRouting();

app.UseAuthorization();

// ✅ Rota fallback para React SPA (index.html)
app.MapFallbackToFile("index.html");

// ✅ Rotas da API
app.MapControllers();

app.Run();
