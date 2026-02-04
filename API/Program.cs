using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});          

builder.Services.AddCors();

builder.Services.AddTransient<ExceptionMiddleware>();// transient - new instance per request , add custom exception middleware as service
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline. Middleware
app.UseMiddleware<ExceptionMiddleware>(); // add custom exception middleware

//app.UseDeveloperExceptionPage(); - this middleware is added by default in development environment 
                                    //  and shows detailed exception page

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000");
});

//if (app.Environment.IsDevelopment())
//{
//    app.MapOpenApi();
//}

//app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

DbInitializer.InitDb(app);

app.Run();
