// [ 1. Collection의 크기를 예측하여 설정하라 ]
// 크기를 예측하여 직접 설정하라 
List<String> list = new ArrayList(5);

// [ 2. Stream을 사용하라 ]
byte[] fileData = readFileToByteArray(new File("myfile.txt"));

FileInputStream fis = new FileInputStream("myfile.txt");
MyProtoBufMessage msg = MyProtoBufMessage.parseFrom(fis);

// [ 3. String의 사용을 최적화하라 ]
// 1. 중복된 String이 생성되는 경우, JVM 옵션을 활용하라
java -XX:+UseStringDeduplication -jar Application.java

// 2. StringBuilder를 사전에 활용하라
// b 역시 String 객체이다.
String a = a + b;

StringBuilder temp = new StringBuilder(a).
temp.append(b);
a = temp.toString(); // 새로운 String이 할당되고, 기존의 a의 데이터는 가비지가 됨

String result = foo() + arg;
result += boo();
System.out.println(“result = “ + result);

StringBuilder value = new StringBuilder(“result = “);
value.append(foo()).append(arg).append(boo());
System.out.println(value);

// 3. 불변성(Immutability)을 활용하라
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

// 4. 불필요한 Collection의 생성을 피해라
public List<Item> readFileItem(FileData fileData) {
    final List<Item> list = new ArrayList<>();
    for (Data data : fileData.items()) {
        list.add(new Item(data.getName(), data.getSize()));
    }
    return list;
}

final List<Item> items = new ArrayList<>();
for (FileData fileData : fileDatas) {
    items.addAll(readFileItem(fileData));
}

public void readFileItem(List<Item> items, FileData fileData) {
    for (Data data : fileData.items()) {
        items.add(new Item(data.getName(), data.getSize()));
    }
}

final List<Item> items = new ArrayList<>(10000);
for (FileData fileData : fileDatas) {
    readFileItem(items, fileData);
}