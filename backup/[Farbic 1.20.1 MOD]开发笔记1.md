# 注册新物品

## 完善注册系统

在Items.java文件下复制其原生的物品注册代码

``` java
public static Item register(String id, Item item) {
		return register(new Identifier(id), item);
	}

	public static Item register(Identifier id, Item item) {
		return register(RegistryKey.of(Registries.ITEM.getKey(), id), item);
	}

	public static Item register(RegistryKey<Item> key, Item item) {
		if (item instanceof BlockItem) {
			((BlockItem)item).appendBlocks(Item.BLOCK_ITEMS, item);
		}

		return Registry.register(Registries.ITEM, key, item);
	}
```

将其粘贴到新建的item软件包的ModItem类中

<img width="392" height="122" alt="Image" src="https://github.com/user-attachments/assets/8cfac139-acf4-4eff-91d2-c9e8878c7291" />

<img width="1366" height="728" alt="Image" src="https://github.com/user-attachments/assets/c5c7fc9b-e623-4887-9a3c-c6d82d2a8292" />

并将其默认的命名空间改为自己的数据包的命名空间

<img width="1366" height="728" alt="Image" src="https://github.com/user-attachments/assets/3d1b64d7-02d2-4581-a14e-289637951a21" />

## 开始注册物品

仿照原版物品注册的格式在ModItems中注册

<img width="1366" height="728" alt="Image" src="https://github.com/user-attachments/assets/d1205609-c744-44f0-9864-42030558af19" />

## 辅助注册方法

在末尾加上

``` java
//辅助注册
    public  static void registerItems() {

    }
//暂时不用写东西
```

> 注意，要到模组主类中调用(这里的主类是TestMod)

<img width="1366" height="728" alt="Image" src="https://github.com/user-attachments/assets/6f0fbdb4-4e25-4eba-8e4c-9aa435c69b74" />

## 添加贴图,语言文件

新建lang，models，textures文件夹

<img width="397" height="227" alt="Image" src="https://github.com/user-attachments/assets/c706b8a1-fc9b-4cc5-8a8d-dde74ecd8d59" />

在lang文件夹下创建en_us.json文件来存放英文的物品名称，zn_cn.json存中文

<img width="1366" height="728" alt="Image" src="https://github.com/user-attachments/assets/0f11f8fe-9da8-4308-bc6c-148b1422cad2" />

<img width="1366" height="728" alt="Image" src="https://github.com/user-attachments/assets/44d5685f-6e50-4dae-bb8b-73bcc01a6dd8" />

接下来，在models和textures文件夹中各建一个item(物品)和一个block(方块)

再在models/item中创建一个test_item.json文件用来配置物品。

在其中输入

``` json
{
  "parent": "minecraft:item/generated",//设置父级文件
  "textures": {
    "layer0": "test-mod:item/test_item"//设置贴图，test-mod是命名空间，也就是数据包id
  }
}
```

## 添加贴图文件

将png格式的贴图文件放进textures/item中，名字与物品id一致

<img width="378" height="354" alt="Image" src="https://github.com/user-attachments/assets/5238b7fd-5482-4ebe-aabb-ab19e39d4d4f" />