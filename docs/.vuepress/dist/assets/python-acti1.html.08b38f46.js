import{_ as n,o as s,c as e,a}from"./app.ee4e0c75.js";const t="/images/thonny.png",o={},p=a('<h1 id="utilisation-de-thonny" tabindex="-1"><a class="header-anchor" href="#utilisation-de-thonny" aria-hidden="true">#</a> Utilisation de Thonny</h1><div class="custom-container tip" style="border-color:#4675d0;"><p class="custom-container-title">Consigne</p><p>Thonny est un interpr\xE9teur Python <strong>gratuit, open-source, et multi-plateformes</strong>. Que signifient ces termes ?</p></div><h2 id="interface-de-thonny" tabindex="-1"><a class="header-anchor" href="#interface-de-thonny" aria-hidden="true">#</a> Interface de Thonny</h2><p><img src="'+t+`" alt="Interface de Thonny" width="500"></p><p>L&#39;interface de Thonny est tr\xE8s simple, la zone sup\xE9rieure est l&#39;<strong>\xE9diteur de code</strong>, et la zone inf\xE9rieure s&#39;appelle la <strong>console</strong>.</p><h3 id="utilisation-de-la-console" tabindex="-1"><a class="header-anchor" href="#utilisation-de-la-console" aria-hidden="true">#</a> Utilisation de la console</h3><p>Pour utiliser la console, il suffit de taper les instructions les unes apr\xE8s les autres. Essayons avec quelque chose de simple.</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token number">3</span> <span class="token operator">+</span> <span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>La console a calcul\xE9 pour vous la somme <code>3+4</code>. Vous pouvez utiliser des variables dans la console :</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Bonjour&quot;</span><span class="token punctuation">)</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> temperature <span class="token operator">=</span> <span class="token number">19</span>
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;La temp\xE9rature est de&quot;</span><span class="token punctuation">,</span> temperature<span class="token punctuation">,</span> <span class="token string">&quot;degr\xE9s&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Vous pouvez \xE9galement int\xE9grer de l&#39;interactivit\xE9 avec la fonction <code>input()</code> :</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> prenom <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;Quel est ton pr\xE9nom ? \\n&quot;</span><span class="token punctuation">)</span>
<span class="token operator">//</span> La console attend que vous indiquiez une valeur
<span class="token operator">&gt;&gt;</span><span class="token operator">&gt;</span> <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Bonjour &quot;</span><span class="token punctuation">,</span> prenom<span class="token punctuation">,</span> <span class="token string">&quot; !&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="utilisation-de-l-editeur-de-code" tabindex="-1"><a class="header-anchor" href="#utilisation-de-l-editeur-de-code" aria-hidden="true">#</a> Utilisation de l&#39;\xE9diteur de code</h3><p>La console est pratique pour de petites op\xE9rations, mais elle se retrouve tr\xE8s vite limit\xE9e lorsqu&#39;il est question de r\xE9aliser des programmes plus complexes et plus longs. L&#39;\xE9diteur de code nous permet de pouvoir \xE9crire toutes les instructions \xE0 la suite les unes des autres, puis de lancer l&#39;interpr\xE9tation du programme \xE0 l&#39;aide de la touche <code>F5</code> (ou du bouton correspondant).</p><p>Voici un exemple de programme Python tr\xE8s simple.</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Bonjour, quel est ton pr\xE9nom ?&quot;</span><span class="token punctuation">)</span>
prenom <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Bonjour &quot;</span><span class="token punctuation">,</span> prenom<span class="token punctuation">,</span> <span class="token string">&quot;, quel est ton \xE2ge ?&quot;</span><span class="token punctuation">)</span>
age <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Tr\xE8s bien &quot;</span><span class="token punctuation">,</span> prenom<span class="token punctuation">,</span> <span class="token string">&quot;, tu as &quot;</span><span class="token punctuation">,</span> age<span class="token punctuation">,</span> <span class="token string">&quot; ans.&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip" style="border-color:#4675d0;"><p class="custom-container-title">Consigne</p><ol><li>R\xE9aliser un programme python basique en vous inspirant du dernier exemple.</li><li>Dans l&#39;exemple 3, \xE0 quoi sert le caract\xE8re <code>\\n</code> ?</li></ol></div>`,17),i=[p];function r(l,c){return s(),e("div",null,i)}const d=n(o,[["render",r],["__file","python-acti1.html.vue"]]);export{d as default};
