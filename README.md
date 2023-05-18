## Garbage Collection (GC) 이란?
### 가비지 컬렉션(Garbage Collection, 이하 GC)은 자바의 메모리 관리 방법 중의 하나로 JVM(자바 가상 머신)의 Heap 영역에서 동적으로 할당했던 메모리 중 필요 없게 된 메모리 객체(garbage)를 모아 주기적으로 제거하는 프로세스를 말한다.

### C / C++ 언어에서는 이러한 가비지 컬렉션이 없어 프로그래머가 수동으로 메모리 할당과 해제를 일일이 해줘야 했었다.

반면 Java에서는 가비지 컬렉터가 메모리 관리를 대행해주기 때문에 Java 프로세스가 한정된 메모리를 효율적으로 사용할수 있게 하고, 개발자 입장에서 메모리 관리, 메모리 누수(Memory Leak) 문제에서 대해 관리하지 않아도 되어 오롯이 개발에만 집중할 수 있다는 장점이 있다.

## 가비지 컬렉션 대상
### 그럼 가비지 컬렉션(Garbage Collection)은 어떤 Object를 Garbage로 판단해서 스스로 지워버릴까?

### 가비지 컬렉션은 특정 객체가 garbage인지 아닌지 판단하기 위해서 도달성, 도달능력(Reachability) 이라는 개념을 적용한다.

### 객체에 레퍼런스가 있다면 Reachable로 구분되고, 객체에 유효한 레퍼런스가 없다면 Unreachable로 구분해버리고 수거해버린다. 

### Reachable : 객체가 참조되고 있는 상태
### Unreachable  : 객체가 참조되고 있지 않은 상태 (GC의 대상이 됨) 

## 가비지 컬렉션 동작 과정

<img width="80%" src="https://github.com/HanEunSeob/Garbage-Collection-study/assets/133829058/8116858b-a1c5-4f45-a0a1-0e76d4aa9a18"/>

### 1. Stop the world

JVM이 GC를 실행하기 위해서 애플리케이션의 실행을 멈추는 작업이다. 이때는 GC를 실행하는 쓰레드 외 다른 모든 쓰레드는 작업이 중단된다. 애플리케이션 중단 시간 최소화를 위해서 이 stop the world 작업의 소요시간을 줄이기 위해 다양한 알고리즘을 적용한다.

### 2. Mark and Sweep

Stop the world 이후, GC가 스택의 모든 변수 또는 접근 가능한 Reachable 객체를 스캔한다. 사용되지 않는 메모리를 식별하는 과정이 Mark, 이 메모리들을 제거하는 과정을 Sweep 이라고 한다.

## GC가 제대로 동작되도록 하는 코드
### 1. Collection의 크기를 예측하여 설정하라.

<code>
List<String> list = new ArrayList(5);
  </code>
  
### 2. Stream을 사용하라
  
<code>
  byte[] fileData = readFileToByteArray(new File("myfile.txt"));
  </code>
  
  <code>
    FileInputStream fis = new FileInputStream("myfile.txt");
MyProtoBufMessage msg = MyProtoBufMessage.parseFrom(fis);
  </code>
  
### 3. String의 사용을 최적화하라
#### 1. 중복된 String이 생성되는 경우, JVM 욥션을 활용하라
  
  <code>
    java -XX:+UseStringDeduplication -jar Application.java
  </code>

#### 2. StringBuilder를 사전에 활용하라
  
  <code>
  String a = a + b;
  </code>
  
  <code>
    StringBuilder temp = new StringBuilder(a).
temp.append(b);
a = temp.toString(); // 새로운 String이 할당되고, 기존의 a의 데이터는 가비지가 됨
  </code>
  
  <code>
    String result = foo() + arg;
result += boo();
System.out.println(“result = “ + result);
  </code>
  
  <code>
    StringBuilder value = new StringBuilder(“result = “);
value.append(foo()).append(arg).append(boo());
System.out.println(value);
  </code>
  
#### 3.불변성(Immutability)을 활용하라
  
  <code>
    public class MutableHolder {
    private Object value;
    public Object getValue() { return value; }
    public void setValue(Object o) { value = o; }
}

public class ImmutableHolder {
    private final Object value;
    public ImmutableHolder(Object o) { value = o; }
    public Object getValue() { return value; }
}
  </code>
  
#### 4. 불필요한 Collection의 생성을 피해라
  
  <code>
    public List<Item> readFileItem(FileData fileData) {
    final List<Item> list = new ArrayList<>();
    for (Data data : fileData.items()) {
        list.add(new Item(data.getName(), data.getSize()));
    }
    return list;
}
    </code>
    
    <code>
      final List<Item> items = new ArrayList<>();
for (FileData fileData : fileDatas) {
    items.addAll(readFileItem(fileData));
}
      </code>
      
      <code>
  public void readFileItem(List<Item> items, FileData fileData) {
    for (Data data : fileData.items()) {
        items.add(new Item(data.getName(), data.getSize()));
    }
}

final List<Item> items = new ArrayList<>(10000);
for (FileData fileData : fileDatas) {
    readFileItem(items, fileData);
}
        </code>
        
## GC로 메모리 leak되는 예제
### Example 1 : Autoboxing

<code>
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
                                    </code>
  
## Example 2 : Using Cashe

<code>
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
  </code>
  
## Example 3 : Closing Connections
  
<code>
try
{
  Connection con = DriverManager.getConnection();
  …………………..
    con.close();
}

Catch(exception ex)
{
}
  </code>
  
 #### 출처
##### https://inpa.tistory.com/entry/JAVA-%E2%98%95-%EA%B0%80%EB%B9%84%EC%A7%80-%EC%BB%AC%EB%A0%89%EC%85%98GC-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%F0%9F%92%AF-%EC%B4%9D%EC%A0%95%EB%A6%AC (정의, 동작 원리)
##### https://mangkyu.tistory.com/120# (GC코드)
##### https://dzone.com/articles/memory-leak-andjava-code (메모리 누수)
