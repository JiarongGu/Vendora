using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Vendora.Application.Extensions
{
    public static class AssemblyExtensions
    {
        public static IEnumerable<Type> GetLoadableTypes(this Assembly assembly)
        {
            if (assembly == null) throw new ArgumentNullException(nameof(assembly));
            try
            {
                return assembly.GetTypes();
            }
            catch (ReflectionTypeLoadException e)
            {
                return e.Types.Where(t => t != null);
            }
        }

        public static bool IsClassAssignableFrom(this Type type, Type assigned)
        {
            return type.IsClass && !type.IsAbstract && assigned.IsAssignableFrom(type);
        }

        public static bool IsImplementedInterface(this Type type, Type implementedType)
        {
            var isAssignableFrom = type
                .GetInterfaces()
                .Select(x => x.GetGenericTypeDefinitionOrDefault() ?? x)
                .Contains(implementedType);

            return type.IsClass && !type.IsAbstract && !type.IsInterface && isAssignableFrom;
        }

        public static Type GetGenericTypeDefinitionOrDefault(this Type type)
        {
            if (type == null || !type.IsGenericType)
                return null;

            return type.GetGenericTypeDefinition();
        }
    }
}
