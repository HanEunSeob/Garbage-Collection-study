// Example 1: Autoboxing
package com.example.memoryleak;
public class Adder {
       publiclong addIncremental(long l)
       {
              Long sum=0L;
               sum =sum+l;
               return sum;
       }
       public static void main(String[] args) {
              Adder adder = new Adder();
              for(long ;i<1000;i++)
              {
                     adder.addIncremental(i);
              }
       }
}

// Example 2: Using Cache
package com.example.memoryleak;
import java.util.HashMap;
import java.util.Map;
public class Cache {
       private Map<String,String> map= new HashMap<String,String>();
       publicvoid initCache()
       {
              map.put("Anil", "Work as Engineer");
              map.put("Shamik", "Work as Java Engineer");
              map.put("Ram", "Work as Doctor");
       }
       public Map<String,String> getCache()
       {
              return map;
       }
       publicvoid forEachDisplay()
       {
              for(String key : map.keySet())
              {
                String val = map.get(key);                 
                System.out.println(key + " :: "+ val);
              }
       }
       public static void main(String[] args) {            
              Cache cache = new Cache();
              cache.initCache();
              cache.forEachDisplay();
       }
}

// Example 3: Closing Connections
try
{
  Connection con = DriverManager.getConnection();
  …………………..
    con.close();
}

Catch(exception ex)
{
}