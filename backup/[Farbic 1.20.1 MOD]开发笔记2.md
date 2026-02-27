# 加入物品到创造模式物品栏

## 法一，加入到原版物品栏

进入ModItems文件

先定义一个方法来加入

```java
private static void addItemToItemGroup(FabricItemGroupEntries entries){
    entries.add(物品名称，不是id，不打引号)；
}
//FabricItemGroupEntries entries是管理加入物品栏的api，将其回调，就可以在这个方法中调用了
```

接下来，需要在辅助注册中配置其具体分类到哪个标签页

```java
public  static void registerItems() {
        ItemGroupEvents.modifyEntriesEvent(ItemGroups.NATURAL).register(ModItems::addItemToItemGroup);
        //ItemGroupEvents.modifyEntriesEvent(...)这是一个事件触发器，专门用来修改创造模式物品栏。
        //ItemGroupEvents.modifyEntriesEvent表示要干的事情，然后在括号中告诉他具体要分到哪一类，再调用register注册回调函数，说明当需要展示这个标签页时，请调用这个方法，后面则代表把什么放进去，ModItems就是命名空间，后面的就是具体的方法
    }
```

> 小知识:1.带s的方法一般都是管注册的
>
> ​		  2.方法名叫 `addItemToItemGroup`，参数是 `entries`，这两处其实**名字可以随便起**，只要类型对就行

最后跑起来就好啦

<img width="325" height="78" alt="Image" src="https://github.com/user-attachments/assets/ab071955-8123-4018-952c-ae65b689f294" />

## 法二，注册新的物品栏标签页

首先在item目录下新建一个**ModItemGroup**类用于存放代码

然后敲代码

```java
package hyj.test.item;

import hyj.test.TestMod;
import net.minecraft.item.ItemGroup;
import net.minecraft.item.ItemStack;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.registry.RegistryKey;
import net.minecraft.registry.RegistryKeys;
import net.minecraft.text.Text;
import net.minecraft.util.Identifier;
//注册创造物品栏
public class ModItemGroups {
    //指向itemgroup
    public static final RegistryKey<ItemGroup> Mod_Group  = register("mod_group");
    //注册系统(照抄)
    private static RegistryKey<ItemGroup> register(String id) {
        return RegistryKey.of(RegistryKeys.ITEM_GROUP, new Identifier(TestMod.MOD_ID,id));
        //new Identifier(TestMod.MOD_ID,id)注册新的命名空间
    }
    //辅助注册
    public static void registerGroups(){
        // ========== 核心注册动作 ==========
        // Registry.register 是 Minecraft 的通用注册方法，作用是把一个对象（第三个参数）放入特定的注册表（第一个参数），并赋予它一个唯一的 ID（第二个参数）
        Registry.register(
                Registries.ITEM_GROUP,      // 注册表类型：这里是物品栏标签页的注册表，所有创造模式物品栏页都在这里登记
                Mod_Group,                  // 这个常量里封装了标签页的唯一ID "mod_group"
                // ========== 创建新标签页的详细配置 ==========
                ItemGroup.create(ItemGroup.Row.TOP, 7)   // 创建一个物品栏标签页的构建器
                        // 参数1：在哪一行，TOP 是上面一排，BOTTOM 是下面一排
                        // 参数2：列索引，从0开始，7表示第8个位置（前面有7个原版标签页占位）
                        .displayName(Text.translatable("itemGroup.mod_group")) // 设置标签页显示的名称
                        // Text.translatable 表示从语言文件读取翻译，对应键 "itemGroup.mod_group" 需要在你的 assets/lang/zh_cn.json 中定义
                        .icon(() -> new ItemStack(ModItems.Test_Item))         // 设置标签页的图标，使用 Lambda 表达式返回一个物品堆
                        // () -> 表示没有参数，new ItemStack(...) 就是返回的物品堆，图标会显示 Test_Item 的纹理
                        .entries((displayContext, entries) -> {                // 定义这个标签页里包含哪些物品
                            // displayContext 是内部使用的上下文，暂时可以忽略
                            // entries 是一个“添加物品”的工具，和之前你见过的 FabricItemGroupEntries 类似
                            entries.add(ModItems.Test_Item);      // 把 Test_Item 加进去
                            entries.add(ModItems.Raw_Test_Item);  // 把 Raw_Test_Item 加进去
                        })
                        .build()    // 调用 build() 方法完成构建，生成最终的 ItemGroup 对象
        );
                            //注意要到主类去调用
    }
}

```

带注释，该讲的都讲完了，最后到主类调用

<img width="1330" height="680" alt="Image" src="https://github.com/user-attachments/assets/e5ab50d0-b89c-41eb-9e8e-ae48e65a9f21" />



