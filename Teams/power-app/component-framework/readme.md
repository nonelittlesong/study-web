# [PCF](https://docs.microsoft.com/zh-cn/powerapps/developer/component-framework/component-framework-for-canvas-apps)

包括三部分：

1. `Manifest` — 描述元数据
2. `Component implementation`
   - 必须有一个 `index.ts`
   - 包含控制声明周期的方法 `init`, `updateView` 和 `destroy`
3. `Resources` — `manifest` 中涉及到的静态资源
   - 如 css、code、img、html 等

## 1. 需求

- 需要在管理中心开启 Power Apps component framework 特性

## 2. 实现

### 2.1. 环境

1. 安装 VSCode（选择 Add to PATH）
2. 安装 node.js
3. [安装 Power Platform CLI](https://docs.microsoft.com/zh-cn/powerapps/developer/data-platform/powerapps-cli)
4. .NET build tools — [修复安装器的网络问题](https://blog.csdn.net/qq_43085848/article/details/109901050)

### 2.2. 创建项目

创建项目根目录：

```
mkdir LinearInput
```

用 VSCode 打开根目录。创建项目：

```
pac pcf init --namespace SampleNamespace --name LinearInputControl --template field
```

### 2.3. 实现 manifest

```xml
<?xml version="1.0" encoding="utf-8" ?>
<manifest>
  <control namespace="SampleNamespace" constructor="LinearInputControl" version="1.1.0" display-name-key="LinearInputControl_Display_Key" description-key="LinearInputControl_Desc_Key" control-type="standard">
   	<type-group name="numbers">
   		<type>Whole.None</type>
   		<type>Currency</type>
   		<type>FP</type>
   		<type>Decimal</type>
   	</type-group>
   	<property name="controlValue" display-name-key="controlValue_Display_Key" description-key="controlValue_Desc_Key" of-type-group="numbers" usage="bound" required="true" />
    <resources>
      <code path="index.ts" order="1" />
      <css path="css/LinearInputControl.css" order="1" />
    </resources>
  </control>
</manifest>
```

### 2.4. 实现代码

```ts
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class LinearInputControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _value: number;
	private _notifyOutputChanged: () => void;
	private labelElement: HTMLLabelElement;
	private inputElement: HTMLInputElement;
	private _container: HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;
	private _refreshData: EventListenerOrEventListenerObject;

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
		this._context = context;
		this._container = document.createElement("div");
		this._notifyOutputChanged = notifyOutputChanged;
		this._refreshData = this.refreshData.bind(this);

		// creating HTML elements for the input type range and binding it to the function which refreshes the control data
		this.inputElement = document.createElement("input");
		this.inputElement.setAttribute("type", "range");
		this.inputElement.addEventListener("input", this._refreshData);

		//setting the max and min values for the control.
		this.inputElement.setAttribute("min", "1");
		this.inputElement.setAttribute("max", "1000");
		this.inputElement.setAttribute("class", "linearslider");
		this.inputElement.setAttribute("id", "linearrangeinput");

		// creating a HTML label element that shows the value that is set on the linear range control
		this.labelElement = document.createElement("label");
		this.labelElement.setAttribute("class", "LinearRangeLabel");
		this.labelElement.setAttribute("id", "lrclabel");

		// retrieving the latest value from the control and setting it to the HTMl elements.
		this._value = context.parameters.controlValue.raw!;
		this.inputElement.setAttribute("value", context.parameters.controlValue.formatted ? context.parameters.controlValue.formatted : "0");
		this.labelElement.innerHTML = context.parameters.controlValue.formatted ? context.parameters.controlValue.formatted : "0";

		// appending the HTML elements to the control's HTML container element.
		this._container.appendChild(this.inputElement);
		this._container.appendChild(this.labelElement);
		container.appendChild(this._container);
	}

	public refreshData(evt: Event): void {
		this._value = (this.inputElement.value as any) as number;
		this.labelElement.innerHTML = this.inputElement.value;
		this._notifyOutputChanged();
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// storing the latest context from the control.
		this._value = context.parameters.controlValue.raw!;
		this._context = context;
		this.inputElement.setAttribute("value", context.parameters.controlValue.formatted ? context.parameters.controlValue.formatted : "");
		this.labelElement.innerHTML = context.parameters.controlValue.formatted ? context.parameters.controlValue.formatted : "";
	}

	public getOutputs(): IOutputs {
		return {
			controlValue: this._value
		};
	}

	public destroy(): void {
		this.inputElement.removeEventListener("input", this._refreshData);
	}
}
```

### 2.5. 添加样式

```css
.SampleNamespace\.LinearInputControl input[type=range].linearslider {   
	margin: 1px 0;   
	background:transparent;
	-webkit-appearance:none;
	width:100%;padding:0;
	height:24px;
	-webkit-tap-highlight-color:transparent
}
.SampleNamespace\.LinearInputControl input[type=range].linearslider:focus {
	outline: none;
}
.SampleNamespace\.LinearInputControl input[type=range].linearslider::-webkit-slider-runnable-track {   
	background: #666;
	height:2px;
	cursor:pointer
}   
.SampleNamespace\.LinearInputControl input[type=range].linearslider::-webkit-slider-thumb {   
	background: #666;   
	border:0 solid #f00;
	height:24px;
	width:10px;
	border-radius:48px;
	cursor:pointer;
	opacity:1;
	-webkit-appearance:none;
	margin-top:-12px
}    
.SampleNamespace\.LinearInputControl input[type=range].linearslider::-moz-range-track {   
	background: #666;   
	height:2px;
	cursor:pointer  
}   
.SampleNamespace\.LinearInputControl input[type=range].linearslider::-moz-range-thumb {   
	background: #666;   
	border:0 solid #f00;
	height:24px;
	width:10px;
	border-radius:48px;
	cursor:pointer;
	opacity:1;
	-webkit-appearance:none;
	margin-top:-12px
}   
.SampleNamespace\.LinearInputControl input[type=range].linearslider::-ms-track {   
	background: #666;   
	height:2px;
	cursor:pointer  
}    
.SampleNamespace\.LinearInputControl input[type=range].linearslider::-ms-thumb {   
	background: #666;   
	border:0 solid #f00;
	height:24px;
	width:10px;
	border-radius:48px;
	cursor:pointer;
	opacity:1;
	-webkit-appearance:none;
}
```

### 2.6. Build

```
npm run build
```

### 2.7. Debug

```
npm start watch
```

## 3. 打包

在 `LinearInput` 文件夹下创建 Solutions 文件夹。

进入 Solutions 文件夹，运行：

```
pac solution init --publisher-name Samples --publisher-prefix samples
```

添加 reference：

```
pac solution add-reference --path ..\
```

生成 zip：

```
msbuild /t:restore
msbuild
```

## 资源

- [cassiebreviu/PowerAppsComponent](https://github.com/cassiebreviu/PowerAppsComponent)


