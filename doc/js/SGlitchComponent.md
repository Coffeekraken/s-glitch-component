# SGlitchComponent

Create a nice glitch effect on any HTMLElement

### Example

```html
<s-glitch> <!-- your html here --> </s-glitch>
```

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)

Extends **SWebComponent**

## Attributes

Here's the list of available attribute(s).

### fps

Specify the fps for the glitch effect

Type : **{ Integer }**

Default : **30**

### minTimeout

Specify the min timeout between the glitches phase in ms

Default : **0**

### maxTimeout

Specify the max timeout between the glitches phase in ms

Type : **{ Integer }**

Default : **5000**

### minDuration

Specify the min glitch duration in ms

Type : **{ Integer }**

Default : **100**

### maxDuration

Specify the max glitch duration in ms

Type : **{ Integer }**

Default : **2000**

### pauseOnHover

Specify if want to pause the glitch effect on hover

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**

### pauseWhenOut

Specify if want to pause the glitch effect when out of viewport

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**

### glitchOnHover

Specify if want to glitch onhover. If set a css selector, will take this as source of hover

Type : **{ Mixed }**

Default : **false**

### waitOnImages

Wait till images are fully loaded to render the glitch canvas

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**

## Methods

### pause

Pause the glitch timeout

Return **{ SGlitchComponent }** The component instance

### start

Start the glitch timeout

Return **{ SGlitchComponent }** The component instance

### isStarted

Check if the timeout is started

Return **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }** true if started, false if not

### domUpdated

Call this function when the dom has been upated to refresh the glitch canvas

Return **{ [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise) }** A promise when the canvas has been updated

## Events

### ready

Dispatched when the component is ready to accept inputs like "start", "pause", etc...
