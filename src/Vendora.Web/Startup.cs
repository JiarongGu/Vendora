using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Vendora.Web.Middlewares;
using Vendora.Web.Services;

namespace Vendora.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options => {
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                });
            
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddScoped<ISpaPrerenderingService, SpaPrerenderingService>();

            services.AddCoreModules(Configuration);
            services.AddInfrastructureModules(Configuration);

            ServiceLocator.SetLocatorProvider(services.BuildServiceProvider());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            
            app.UseMiddleware<ExceptionHandlingMiddleware>();

            app.UseHttpsRedirection();

            app.Map("/api", apiApp => {
                apiApp.UseMvc(routes => routes.MapRoute("default", "{controller}/{action=Index}/{id?}"));
            });

            // Add URL prefix, so all middleware below will follow the new request URL
            app.Use((context, next) =>
            {
                // you can have different conditions to add different prefixes
                context.Request.Path = "/loan" + context.Request.Path;
                return next.Invoke();
            });

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            //app.Map("/admin", apiApp =>
            //{
            //    app.UseSpa(spa =>
            //    {
            //        spa.Options.SourcePath = "ClientApp/build";
            //        spa.Options.DefaultPage = "/admin/index.html";
            //        //spa.UseSpaPrerendering(options =>
            //        //{
            //        //    options.BootModulePath = $"{spa.Options.SourcePath}/build/server/bundle.js";
            //        //    options.SupplyData = ServiceLocator.Current.GetInstance<ISpaPrerenderingService>().Process;
            //        //});
            //    });
            //});

            app.Map("/loan", spaApp =>
                spaApp.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "ClientApp/build";
                    // because the root is 'ClientApp/build' 
                    // so we need to use the index.html in desktop folder for SSR
                    spa.Options.DefaultPage = "/loan/index.html";
                    //spa.UseSpaPrerendering(options =>
                    //{
                    //    options.BootModulePath = $"{spa.Options.SourcePath}/loan/server/bundle.js";
                    //    options.SupplyData = ServiceLocator.Current.GetInstance<ISpaPrerenderingService>().Process;
                    //});
                })
            );
        }
    }
}
