React lucid is used for the icons

framer motion is used for the animations

React theme provider is used for theme handling

if you want to make the change in the theme please change the .dark , .light and * classes in global.css

----------------------------------------------------------------------------------GRAPHS---------------------------------------------------------------------------------------

chart.js is used for making charts , import the component and call it and define all the propertis , if not graph will take default properties .

   <GlobalGraph
        type="bar"
        labels={["Q1", "Q2", "Q3", "Q4"]}
        data={[50, 80, 65, 95]}
        title="Bar Type Graph"
        lineColor="#10b981"
        fillColor="#10b981"
      />

      i. "type" defines the type of the chart (available chart names will be provided on entering the inverted commas and then press "ctrl+tab")
      ii. "labels" define the horizontal labels against which data is given
      iii. "data" define the vertical data that is shown against the horizontal labels
      iv. "lineColor" defines the border color of the graph (border of bars in this case)
      v. "fillColor" defines the original color (of the bars in this case) 

see the graphs.tsx for example

-------------------------------------------------------------------------------------TABLES--------------------------------------------------------------------------------------------------

<Table 
        data={data}
        title="Double Border - FIXED"
        clickable={false}
        control={{
          bordered: true,
          borderStyle: "double",
          borderColor: "#2196f3",
          hover: true
        }}
      />


    i. "data" defines the data of the table
    ii. "title" defines the title of the table
    iii. "clickable" defines if the rows of the table can be clicked or not (advanced control)
--------- "control" provide the further controls , if the controls section not provided , it will be just a simple table----------
    iv. "bordered" defines if the table is sorrounded with border.
    v. "borderStyle" define the style of border (double , dotted , solid)
    vi. "borderColor" defines the color of the border
    vii. "hover" defines if there will be a hover state or not



Loaders are defined , just define their type , color and size and use it

For using toggle switch , provide these credentials

          <ToggleSwitch
          isOn={theme !== "dark"}
          onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
          withIcons
        />

    i. "isOn" is the state where we will define that when the toggle will be on and off
    ii. "onToggle" as officially used , is the function that will be performed by the toggle switch (changing the theme in this case)
    iii. "withIcons" as the prop defines , decides if the icons will present or not in the toggle . (moon and sun in this case . we can change the images in the /ui-components/toggles.tsx )
