using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Anezi",
                    Email = "marylyn@gmail.com",
                    UserName = "marylyn@gmail.com",
                    Address = new Address
                    {
                        FirstName = "Anezi",
                        LastName = "Chiekezie",
                        Street = "10 Nnebe Close",
                        City = "Abakpa",
                        ZipCode = "90210"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}